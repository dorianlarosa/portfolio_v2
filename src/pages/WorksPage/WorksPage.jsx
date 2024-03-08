import React, { useEffect, useRef, useContext } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import "./WorksPage.scss";
import data from '../../api/data.json';
import { PageTransition, CustomLink } from "../../components";
import { useCustomCursor } from '../../hooks/useCustomCursor';
import { Link } from 'react-router-dom';
import AOS from 'aos';

import CustomCursorContext from '../../components/CustomCursor/context/CustomCursorContext';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const WorksPage = () => {
    const { handleMouseEnter, handleMouseLeave } = useCustomCursor();
    const sliderRef = useRef(null); // Utilisé pour stocker la référence à l'élément du slider
    const { setType } = useContext(CustomCursorContext);

    useEffect(() => {
        setType("scroll");
        // Assurez-vous que la classe Slider est définie à l'extérieur du composant WorksPage
        const slider = new Slider(sliderRef.current); // Passer la référence actuelle à l'instance de Slider
        slider.init();

        setTimeout(() => {
            ScrollTrigger.refresh();
            AOS.refresh();
        }, 1000);


        // Retourne une fonction de nettoyage qui sera appelée au démontage du composant
        return () => {
            // Ici, vous pouvez nettoyer les ressources, les listeners, etc.
            // window.removeEventListener('wheel', slider.nextSlide); // Exemple de nettoyage
            // slider.removeListeners();
            slider.destroy(); // Méthode de nettoyage ajoutée dans la classe Slider
            slider.removeListeners();

            setType("default");
        };
    }, []); // Le tableau vide assure que l'effet ne s'exécute qu'au montage

    return (
        <>
            <section id="section-slide-works" onMouseEnter={handleMouseEnter("scroll")}
                onMouseLeave={handleMouseLeave}>
                <div className="slider js-slider" ref={sliderRef}>
                    <div className="slider__inner js-slider__inner">
                        <div className="overlay">
                        </div></div>
                    {data.projects.map(project => (
                        <div key={'slide-' + project.id} className="slide js-slide">
                            <div className="container slide__wrapper">

                                <div className="slide__wrapper__content">
                                    <figure className="slide__wrapper__img js-slide__wrapper__img">
                                        <Link to={`${project.slug}`}>
                                            <img onMouseEnter={handleMouseEnter("arrow")}
                                                onMouseLeave={handleMouseLeave}
                                                src={project.thumbnail}
                                                alt={project.name} />
                                        </Link>
                                    </figure>

                                </div>
                                <div className="slider__text js-slider__text">
                                    <div className="slider__text-line js-slider__text-line">
                                        <div className='js-slider__text-line__content name'>{project.name}</div>
                                    </div>
                                    <div className="slider__text-line js-slider__text-line">
                                        <div className='js-slider__text-line__content tags'>{project.tags}</div>
                                    </div>
                                    <div className="slider__text-line js-slider__text-line">
                                        <div className='js-slider__text-line__content link'>
                                            <CustomLink to={`${project.slug}`}>Voir le projet</CustomLink>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>

                    ))}
                    <nav className="slider__nav js-slider__nav">

                        {data.projects.map((project, index) => (
                            <div key={project.id} className="slider-bullet js-slider-bullet" onMouseEnter={handleMouseEnter("link")}
                                onMouseLeave={handleMouseLeave}>
                                <span className="slider-bullet__text js-slider-bullet__text">{index + 1}</span>
                                <div className="slider-bullet__container-line">
                                    <span className="slider-bullet__container-line__line js-slider-bullet__line"></span>
                                </div>

                            </div>
                        ))}

                    </nav>
                </div>
            </section>
            <PageTransition />
        </>
    );
};

class Slider {
    constructor(element) {
        this.isSwiping = false;

        this.startY = 0;
        this.endY = 0;

        this.startX = 0;
        this.endX = 0;

        this.onWindowResize = this.onWindowResize.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
        this.transitionSlide = this.transitionSlide.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.handleTouchMove = (e) => e.preventDefault(); // Empêche le comportement par défaut
        this.render = this.render.bind(this);

        this.element = element;
        this.init = this.init.bind(this);
        this.destroy = this.destroy.bind(this);

        this.textures = [];
        // Initialisation de l'objet state
        this.state = {
            isLoading: true, // Définir l'état de chargement initial sur true
        };


        this.vert = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `

        this.frag = `
        varying vec2 vUv;

        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D disp;

        uniform float dispPower;
        uniform float intensity;
        uniform float transitionAlpha; // Ajout de l'uniforme pour la transition

        uniform vec2 size;
        uniform vec2 res;

        uniform bool isInitialTransition; // true pour la transition initiale, false autrement


        vec2 backgroundCoverUv( vec2 screenSize, vec2 imageSize, vec2 uv ) {
          float screenRatio = screenSize.x / screenSize.y;
          float imageRatio = imageSize.x / imageSize.y;
          vec2 newSize = screenRatio < imageRatio 
              ? vec2(imageSize.x * (screenSize.y / imageSize.y), screenSize.y)
              : vec2(screenSize.x, imageSize.y * (screenSize.x / imageSize.x));
          vec2 newOffset = (screenRatio < imageRatio 
              ? vec2((newSize.x - screenSize.x) / 2.0, 0.0) 
              : vec2(0.0, (newSize.y - screenSize.y) / 2.0)) / newSize;
          return uv * screenSize / newSize + newOffset;
        }
        void main() {
            vec2 uv = vUv;
            vec2 coverUv = backgroundCoverUv(res, size, uv);
            
            vec4 disp = texture2D(disp, coverUv);
            vec2 dispVec = vec2(disp.r * 2.0 - 1.0, disp.g * 2.0 - 1.0);
            
            // Calcul des couleurs des textures en fonction de dispPower
            vec4 textureColor1 = texture2D(texture1, coverUv + (dispVec * intensity * dispPower));
            vec4 textureColor2 = texture2D(texture2, coverUv + (dispVec * intensity * (1.0 - dispPower))); // Texture 2 avec distorsion
            
            // Mélange des couleurs en fonction de dispPower et isInitialTransition
            vec4 finalColor = isInitialTransition ? textureColor1 : mix(textureColor1, textureColor2, dispPower);
            
            // Application de transitionAlpha uniquement lors de la transition initiale
            gl_FragColor = isInitialTransition ? mix(vec4(12.0/255.0, 12.0/255.0, 12.0/255.0, 1.0), finalColor, transitionAlpha) : finalColor;
        }
        
        `



        this.el = document.querySelector('.js-slider')
        this.inner = this.el.querySelector('.js-slider__inner')
        this.slides = [...this.el.querySelectorAll('.js-slide')]
        this.bullets = [...this.el.querySelectorAll('.js-slider-bullet')]

        this.renderer = null
        this.scene = null
        this.clock = null
        this.camera = null

        this.images = data.projects.map(project => project.background);

        this.data = {
            current: 0,
            next: 1,
            total: this.images.length - 1,
            delta: 0
        }

        this.state = {
            animating: false,
            text: false,
            initial: true
        }

        this.textures = null
    }

    // bindAll() {
    //     ['render', 'nextSlide', 'onWindowResize', 'touchStart', 'touchEnd', 'preventDefault']
    //         .forEach(fn => this[fn] = this[fn].bind(this))
    // }

    animateFirstTexture() {
        if (!this.mat || !this.mat.uniforms) {
            return;
        }

        // Assurez-vous que dispPower est réglé pour ne pas interférer avec cette animation initiale.
        this.mat.uniforms.dispPower.value = 1; // Ou assurez-vous que cela correspond à votre logique initiale souhaitée.
        // this.mat.uniforms.transitionAlpha.value = 0; // Ou assurez-vous que cela correspond à votre logique initiale souhaitée.

        // Animer uniquement transitionAlpha de 0 (fond noir) à 1 (révéler la première texture).
        gsap.to(this.mat.uniforms.transitionAlpha, {
            value: 1,
            duration: 2.5,
            ease: "expo.inOut",
            onStart: () => {
            },
            onUpdate: () => this.render(),
            onComplete: () => {
            }
        });

        // // Animer uniquement transitionAlpha de 0 (fond noir) à 1 (révéler la première texture).
        gsap.to(this.mat.uniforms.dispPower, {
            value: 0,
            duration: 2.5,
            ease: "expo.inOut",
            onStart: () => {
            },
            onUpdate: () => this.render(),
            onComplete: () => {
                // Ici, vous pouvez initialiser l'état pour les transitions de slide si nécessaire.
                this.mat.uniforms.isInitialTransition.value = false; // Ou assurez-vous que cela correspond à votre logique initiale souhaitée.


            }
        });

        // Animation spécifique à la direction pour slide__wrapper__content et slider__text-line
        const currentSlideContent = this.slides[this.data.current].querySelector('.slide__wrapper__content');
        const currentTextLines = this.slides[this.data.current].querySelectorAll('.js-slider__text-line .js-slider__text-line__content');
        const isMobile = window.innerWidth < 992;
        const tl = gsap.timeline({ paused: true });

        // Condition pour exécuter différentes animations basées sur la largeur de l'écran
        if (isMobile) {


            // Moins de 992px - Animation pour mobile
            tl.add(gsap.fromTo(currentTextLines, {
                y: "100%",
            }, {
                y: 0,
                duration: 1.5,
                ease: "power3.inOut",
                stagger: 0.1
            }), 1)
                .add(gsap.fromTo(currentSlideContent, {
                    autoAlpha: 0,
                }, {
                    autoAlpha: 1,
                    duration: 1.5,
                    ease: "power3.inOut",
                    onComplete: () => {
                        this.listeners();

                    }
                }), 1.5);
        } else {



            // 992px et plus - Animation pour desktop
            tl.add(gsap.fromTo(currentTextLines, {
                y: "100%",
            }, {
                y: 0,
                duration: 1.5,
                ease: "power3.inOut",
                stagger: 0.1
            }), 1.5)
                .add(gsap.fromTo(currentSlideContent, {
                    y: "100%",
                    autoAlpha: 0,
                }, {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1.5,
                    ease: "back.inOut(1.7)",
                    onComplete: () => {
                        this.listeners();
                    }
                }), 1.5);
        }

        tl.play();
    }


    updateBullets(targetIndex) {
        this.bullets.forEach((bullet, index) => {
            const txt = bullet.querySelector('.js-slider-bullet__text');
            const line = bullet.querySelector('.js-slider-bullet__line');

            if (index === targetIndex) {
                gsap.to(txt, { alpha: 1, duration: .75 });
                gsap.to(line, { scaleX: 1, duration: .75, transformOrigin: 'left', ease: "none" });
            } else {
                gsap.to(txt, { alpha: 0.25, duration: .75 });
                gsap.to(line, { scaleX: 0, duration: .75, transformOrigin: 'left', ease: "none" });
            }
        });
    }

    bulletClick(targetIndexBullet) {
        if (this.state.animating || targetIndexBullet === this.data.current) return;
        let direction;
        if (targetIndexBullet > this.data.current) {
            direction = "next";
        } else {
            direction = "prev";
        }
        this.transitionSlide(direction, targetIndexBullet);
    }

    cameraSetup() {
        this.camera = new THREE.OrthographicCamera(
            this.el.offsetWidth / -2,
            this.el.offsetWidth / 2,
            this.el.offsetHeight / 2,
            this.el.offsetHeight / -2,
            1,
            1000
        )

        this.camera.lookAt(this.scene.position)
        this.camera.position.z = 1
    }

    setup() {
        this.scene = new THREE.Scene()
        this.clock = new THREE.Clock(true)

        this.renderer = new THREE.WebGLRenderer({ alpha: true })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight)

        this.inner.appendChild(this.renderer.domElement)

        this.slides.forEach((slide, index) => {

            gsap.set(slide.querySelector('.slide__wrapper__content'), { autoAlpha: 0 })
            gsap.set(slide.querySelectorAll('.js-slider__text-line .js-slider__text-line__content'), { y: "-110%", })

        })
    }

    loadTextures() {
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = '';
        const texturePromises = this.images.map(image =>
            new Promise(resolve => {
                loader.load(image + '?v=' + Date.now(), texture => {
                    texture.minFilter = THREE.LinearFilter;
                    texture.generateMipmaps = false;
                    resolve(texture); // Résoudre avec la texture chargée
                });
            })
        );

        Promise.all(texturePromises).then(loadedTextures => {
            this.textures = loadedTextures;
            this.disp = loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/rock-_disp.png', () => {
                this.createMesh(); // Appelé après le chargement complet
                this.animateFirstTexture();
                this.render();
            });
            this.disp.magFilter = this.disp.minFilter = THREE.LinearFilter;
            this.disp.wrapS = this.disp.wrapT = THREE.RepeatWrapping;
        }).catch(error => {
            console.error("Error loading textures:", error);
        });
    }

    createMesh() {
        this.mat = new THREE.ShaderMaterial({
            uniforms: {
                dispPower: { type: 'f', value: 0.0 },
                intensity: { type: 'f', value: 0.5 },
                transitionAlpha: { type: 'f', value: 0.0 },
                isInitialTransition: { value: true },
                res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                size: { value: new THREE.Vector2(1920, 1020) },
                texture1: { type: 't', value: this.textures[0] },
                texture2: { type: 't', value: this.textures[1] },
                disp: { type: 't', value: this.disp }
            },
            transparent: true,
            vertexShader: this.vert,
            fragmentShader: this.frag
        })

        const geometry = new THREE.PlaneGeometry(
            this.el.offsetWidth,
            this.el.offsetHeight,
            1
        )

        // Stocker le mesh dans la classe pour y accéder plus tard
        this.mesh = new THREE.Mesh(geometry, this.mat);
        this.scene.add(this.mesh);
    }

    transitionSlide(direction, targetIndexBullet = null) {
        if (this.state.animating) return;
        this.state.animating = true;

        let targetIndex = targetIndexBullet !== null ? targetIndexBullet :
            direction === "next" ? (this.data.current + 1) % this.images.length :
                this.data.current - 1 < 0 ? this.images.length - 1 : this.data.current - 1;

        // Mise à jour des textures pour la transition
        this.updateTextures(this.data.current, targetIndex);

        this.updateBullets(targetIndex);
        // Commencer la transition avec GSAP
        gsap.to(this.mat.uniforms.dispPower, {
            value: 1,
            duration: 2.5,
            ease: "expo.inOut",
            onUpdate: this.render,
            onComplete: () => {


                this.mat.uniforms.dispPower.value = 0.0;
                this.mat.uniforms.isInitialTransition.value = false;

                this.render.bind(this);

                this.state.animating = false;
                // Mise à jour des indices de slide après la transition
                this.data.current = targetIndex;
            }
        });

        // Animation spécifique à la direction pour slide__wrapper__content et slider__text-line
        const currentSlideContent = this.slides[this.data.current].querySelector('.slide__wrapper__content');
        const targetSlideContent = this.slides[targetIndex].querySelector('.slide__wrapper__content');
        const currentTextLines = this.slides[this.data.current].querySelectorAll('.js-slider__text-line .js-slider__text-line__content');
        const targetTextLines = this.slides[targetIndex].querySelectorAll('.js-slider__text-line .js-slider__text-line__content');

        // Vérifier la largeur de l'écran
        const isMobile = window.innerWidth < 992;

        // Configuration de l'animation pour la slide courante et la cible (contenu)
        const tl = gsap.timeline({ paused: true });

        // Condition pour exécuter différentes animations basées sur la largeur de l'écran
        if (isMobile) {
            tl
                // Faire disparaître simultanément les textes et le contenu de la slide actuelle
                .to(currentTextLines, {
                    y: "-100%",
                    duration: 1.5,
                    ease: "power3.inOut",
                    stagger: 0.1
                }, 0)
                .to(currentSlideContent, {
                    autoAlpha: 0,
                    duration: 1.5,
                    ease: "power3.inOut",
                }, 0) // Commence en même temps que l'animation des textes

            tl.addLabel("nextSlideStart", "-=.5");

            // Moins de 992px - Animation pour mobile
            tl.add(gsap.fromTo(targetTextLines, {
                y: "100%",
            }, {
                y: 0,
                duration: 1.5,
                ease: "power3.inOut",
                stagger: 0.1
            }), "nextSlideStart")
                .add(gsap.fromTo(targetSlideContent, {
                    autoAlpha: 0,
                }, {
                    autoAlpha: 1,
                    duration: 1.5,
                    ease: "power3.inOut",
                }), "nextSlideStart");
        } else {
            tl
                // Faire disparaître simultanément les textes et le contenu de la slide actuelle
                .to(currentTextLines, {
                    y: "-100%",
                    duration: 1.5,
                    ease: "power3.inOut",
                    stagger: 0.1
                }, 0)
                .to(currentSlideContent, {
                    y: direction === "next" ? "-100%" : "100%",
                    autoAlpha: 0,
                    duration: 1.5,
                    ease: "back.inOut(1.7)",
                }, 0) // Commence en même temps que l'animation des textes

            tl.addLabel("nextSlideStart", "-=.5");


            // 992px et plus - Animation pour desktop
            tl.add(gsap.fromTo(targetTextLines, {
                y: "100%",
            }, {
                y: 0,
                duration: 1.5,
                ease: "power3.inOut",
                stagger: 0.1
            }), "nextSlideStart")
                .add(gsap.fromTo(targetSlideContent, {
                    y: direction === "next" ? "100%" : "-100%",
                    autoAlpha: 0,
                }, {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1.5,
                    ease: "back.inOut(1.7)",
                }), "nextSlideStart");
        }

        tl.play();
    }



    nextSlide() {
        if (this.state.animating) return;
        this.state.animating = true;

        // Calcul de l'index de la prochaine slide
        let nextIndex = this.data.current + 1 >= this.images.length ? 0 : this.data.current + 1;

        // Mise à jour des textures
        this.updateTextures(this.data.current, nextIndex);

        // Logique pour animer vers la prochaine slide...

        this.transitionNext()

        this.data.current = this.data.current === this.data.total ? 0 : this.data.current + 1
    }

    prevSlide() {
        if (this.state.animating) return;
        this.state.animating = true;

        // Calcul de l'index de la prochaine slide
        // let nextIndex = this.data.current + 1 >= this.images.length ? 0 : this.data.current + 1;

        let prevIndex = this.data.current - 1 < 0 ? this.images.length - 1 : this.data.current - 1;


        // Mise à jour des textures
        this.updateTextures(this.data.current, prevIndex);

        // Logique pour animer vers la prochaine slide...

        this.transitionPrev()

        this.data.current = this.data.current === 0 ? this.data.total : this.data.current - 1
    }


    changeTexture() {
        this.mat.uniforms.texture1.value = this.textures[this.data.current]
        this.mat.uniforms.texture2.value = this.textures[this.data.next]
    }


    updateTextures(currentIndex, nextIndex) {
        this.mat.uniforms.texture1.value = this.textures[currentIndex];
        this.mat.uniforms.texture2.value = this.textures[nextIndex];

        // Mettre à jour `current` et `next` pour refléter le changement
        this.data.current = currentIndex;
        this.data.next = nextIndex;
    }

    onWindowResize() {
        // Mettre à jour les dimensions du rendu et de la caméra
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Mise à jour des uniformes du shader pour la résolution de l'écran
        this.mat.uniforms.res.value.x = window.innerWidth;
        this.mat.uniforms.res.value.y = window.innerHeight;

        // Assurez-vous que la taille de la texture reflète le ratio original de l'image
        // Ceci est un exemple; vous devrez adapter en fonction de votre cas d'usage
        const ratioImage = this.mat.uniforms.size.value.x / this.mat.uniforms.size.value.y;
        const largeurFenetre = window.innerWidth;
        const hauteurFenetre = window.innerHeight;
        const ratioFenetre = largeurFenetre / hauteurFenetre;

        let nouvelleLargeur, nouvelleHauteur;
        if (ratioFenetre > ratioImage) {
            nouvelleLargeur = largeurFenetre;
            nouvelleHauteur = largeurFenetre / ratioImage;
        } else {
            nouvelleHauteur = hauteurFenetre;
            nouvelleLargeur = hauteurFenetre * ratioImage;
        }

        // Mise à jour des uniformes pour la taille
        this.mat.uniforms.size.value.x = nouvelleLargeur;
        this.mat.uniforms.size.value.y = nouvelleHauteur;

        // Redessiner la scène avec les nouvelles dimensions
        this.render();
    }

    touchStart(e) {
        // e.preventDefault();
        this.startY = e.touches[0].clientY;
        this.startX = e.touches[0].clientX;
        this.isSwiping = false; // Initialiser un indicateur de swipe


    }

    touchEnd(e) {
        this.endY = e.changedTouches[0].clientY;
        this.endX = e.changedTouches[0].clientX;

        this.handleSwipeGesture();
        if (this.isSwiping) {
            e.preventDefault(); // Annuler le comportement par défaut uniquement si un swipe a été détecté
        }
    }

    handleSwipeGesture() {
        const threshold = 50; // Seuil minimal de déplacement en pixels pour considérer le geste comme un swipe
        const swipeDistanceY = this.startY - this.endY;
        const swipeDistanceX = this.startX - this.endX;


        if (swipeDistanceX > threshold || swipeDistanceY > threshold) {
            this.isSwiping = true;
            // Swipe vers le haut
            this.transitionSlide("next");
        } else if (swipeDistanceX < -threshold || swipeDistanceY < -threshold) {
            this.isSwiping = true;
            // Swipe vers le bas
            this.transitionSlide("prev");
        }
    }



    render() {
        this.renderer.render(this.scene, this.camera)
    }

    init() {
        this.setupThreeJS();
    }

    setupThreeJS() {
        // Setup de THREE.js (création de la scène, du renderer, etc.)
        this.setup()
        this.cameraSetup()
        this.loadTextures()
        // this.createMesh()
        this.updateBullets(0)
        // this.render()
    }

    handleWheel(e) {
        if (e.deltaY > 0) {
            this.transitionSlide("next");
        } else if (e.deltaY < 0) {
            this.transitionSlide("prev");
        }
    }


    listeners() {
        window.addEventListener('resize', this.onWindowResize, false);
        window.addEventListener('wheel', this.handleWheel, { passive: true });
        this.el.addEventListener('touchstart', this.touchStart, { passive: false });
        this.el.addEventListener('touchend', this.touchEnd, { passive: false });
        document.body.addEventListener('touchmove', this.handleTouchMove, { passive: false });

        // Ajouter des écouteurs pour les bullet clicks
        this.bullets.forEach((bullet, index) => {
            bullet.addEventListener('click', () => this.bulletClick(index));
        });

    }

    // Méthode pour supprimer les écouteurs d'événements
    removeListeners() {
        window.removeEventListener('resize', this.onWindowResize);
        window.removeEventListener('wheel', this.handleWheel);
        this.el.removeEventListener('touchstart', this.touchStart);
        this.el.removeEventListener('touchend', this.touchEnd);
        document.body.removeEventListener('touchmove', this.handleTouchMove);

        // Supprimer les écouteurs pour les bullet clicks
        this.bullets.forEach(bullet => {
            bullet.removeEventListener('click', this.bulletClick);
        });
    }

    destroy() {
        // Nettoyage spécifique de THREE.js (dispose des géométries, textures, matériaux...)
        if (this.renderer) {
            this.renderer.dispose();

        }

        if (this.textures) {
            this.textures.forEach(texture => texture.dispose());
        }
        if (this.mesh) {
            if (this.mesh.geometry) {
                this.mesh.geometry.dispose();
            }

            if (this.mesh.material) {
                this.mesh.material.dispose();
            }
        }

        if (this.scene) {
            while (this.scene.children.length > 0) {
                this.scene.remove(this.scene.children[0]);
            }
        }

        // Assurez-vous de nettoyer toutes les animations GSAP en cours
        // gsap.killTweensOf("*");

        // Nettoyer spécifiquement les instances de ScrollTrigger liées à ce Slider
        ScrollTrigger.getAll().forEach(st => {
            if (st.vars.trigger && this.el.contains(st.vars.trigger)) {
                st.kill();
            }
        });
    }
}


export default WorksPage;
