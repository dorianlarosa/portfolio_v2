import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import "./WorksPage.scss";
import data from '../../api/data.json';
import { PageTransition, CustomLink } from "../../components";
import { useCustomCursor } from '../../hooks/useCustomCursor';
import { useLenis } from '@studio-freight/react-lenis'; // Assurez-vous que cette importation est correcte
import { Link } from 'react-router-dom';



const WorksPage = () => {
    const { handleMouseEnter, handleMouseLeave } = useCustomCursor();
    const sliderRef = useRef(null); // Utilisé pour stocker la référence à l'élément du slider

    useEffect(() => {
        // Assurez-vous que la classe Slider est définie à l'extérieur du composant WorksPage
        const slider = new Slider(sliderRef.current); // Passer la référence actuelle à l'instance de Slider
        slider.init();
        slider.listeners()

        // Retourne une fonction de nettoyage qui sera appelée au démontage du composant
        return () => {
            // Ici, vous pouvez nettoyer les ressources, les listeners, etc.
            // window.removeEventListener('wheel', slider.nextSlide); // Exemple de nettoyage
            slider.removeListeners();
        };
    }, []); // Le tableau vide assure que l'effet ne s'exécute qu'au montage

    return (
        <>
            <section id="section-slide-works">
                <div className="slider js-slider" ref={sliderRef}>
                    <div className="slider__inner js-slider__inner">
                        <div className="overlay">
                        </div></div>
                    {data.projects.map(project => (
                        <div key={'2' + project.id} className="slide js-slide">
                            <div className="slide__content">
                                <figure className="slide__img js-slide__img">
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
                    ))}
                    <nav className="slider__nav js-slider__nav">

                        {data.projects.map((project, index) => (
                            <div key={project.id} className="slider-bullet js-slider-bullet">
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
    constructor() {
        this.startY = 0;
        this.endY = 0;
        // this.bindAll()
        this.onWindowResize = this.onWindowResize.bind(this);
        this.transitionSlide = this.transitionSlide.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.handleTouchMove = (e) => e.preventDefault(); // Empêche le comportement par défaut
        this.render = this.render.bind(this);


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

        uniform vec2 size;
        uniform vec2 res;

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
            
            // Appliquez la fonction backgroundCoverUv pour calculer les nouvelles coordonnées UV
            vec2 coverUv = backgroundCoverUv(res, size, uv);
            
            vec4 disp = texture2D(disp, coverUv);
            vec2 dispVec = vec2(disp.r * 2.0 - 1.0, disp.g * 2.0 - 1.0);
            
            vec2 distPos1 = coverUv + (dispVec * intensity * dispPower);
            vec2 distPos2 = coverUv - (dispVec * -(intensity * (1.0 - dispPower)));
            
            vec4 _texture1 = texture2D(texture1, distPos1);
            vec4 _texture2 = texture2D(texture2, distPos2);
            
            gl_FragColor = mix(_texture1, _texture2, dispPower);
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
            if (index === 0) return

            gsap.set(slide.querySelector('.slide__content'), { autoAlpha: 0 })
            gsap.set(slide.querySelectorAll('.js-slider__text-line .js-slider__text-line__content'), { y: "-110%", })

        })
    }

    loadTextures() {
        const loader = new THREE.TextureLoader()
        loader.crossOrigin = ''

        this.textures = []
        this.images.forEach((image, index) => {
            const texture = loader.load(image + '?v=' + Date.now(), this.render)

            texture.minFilter = THREE.LinearFilter
            texture.generateMipmaps = false

            if (index === 0 && this.mat) {
                this.mat.uniforms.size.value = [
                    texture.image.naturalWidth,
                    texture.image.naturalHeight
                ]
            }

            this.textures.push(texture)
        })

        this.disp = loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/rock-_disp.png', this.render)
        this.disp.magFilter = this.disp.minFilter = THREE.LinearFilter
        this.disp.wrapS = this.disp.wrapT = THREE.RepeatWrapping
    }

    createMesh() {
        this.mat = new THREE.ShaderMaterial({
            uniforms: {
                dispPower: { type: 'f', value: 0.0 },
                intensity: { type: 'f', value: 0.5 },
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

    transitionSlide(direction) {
        if (this.state.animating) return;
        this.state.animating = true;

        // Déterminer l'index de la slide cible en fonction de la direction
        let targetIndex = direction === "next"
            ? (this.data.current + 1 >= this.images.length ? 0 : this.data.current + 1)
            : (this.data.current - 1 < 0 ? this.images.length - 1 : this.data.current - 1);

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
                console.log("Animation Complete");

                this.mat.uniforms.dispPower.value = 0.0;
                this.render.bind(this);
                this.state.animating = false;
                // Mise à jour des indices de slide après la transition
                this.data.current = targetIndex;
                this.data.next = direction === "next"
                    ? (targetIndex + 1 >= this.images.length ? 0 : targetIndex + 1)
                    : (targetIndex - 1 < 0 ? this.images.length - 1 : targetIndex - 1);
            }
        });

        // Animation spécifique à la direction pour slide__content et slider__text-line
        const currentSlideContent = this.slides[this.data.current].querySelector('.slide__content');
        const targetSlideContent = this.slides[targetIndex].querySelector('.slide__content');
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
                    y: "-100%",
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
                    y: '100%',
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
        e.preventDefault();

        this.startY = e.touches[0].clientY;
    }

    touchEnd(e) {
        this.endY = e.changedTouches[0].clientY;
        this.handleSwipeGesture();
    }

    handleSwipeGesture() {
        const threshold = 50; // Seuil minimal de déplacement en pixels pour considérer le geste comme un swipe
        const swipeDistance = this.startY - this.endY;

        if (swipeDistance > threshold) {
            // Swipe vers le haut
            this.transitionSlide("next");
        } else if (swipeDistance < -threshold) {
            // Swipe vers le bas
            this.transitionSlide("prev");
        }
    }



    render() {
        this.renderer.render(this.scene, this.camera)
    }

    init() {
        this.setup()
        this.cameraSetup()
        this.loadTextures()
        this.createMesh()
        this.updateBullets(0)
        this.render()
    }

    listeners() {
        window.addEventListener('resize', this.onWindowResize, false);

        window.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) {
                this.transitionSlide("next");
            } else if (e.deltaY < 0) {
                this.transitionSlide("prev");
            }
        }, { passive: true });

        this.el.addEventListener('touchstart', this.touchStart, { passive: true });
        this.el.addEventListener('touchend', this.touchEnd, { passive: true });

        document.body.addEventListener('touchmove', this.handleTouchMove, { passive: false });

    }

    // Méthode pour supprimer les écouteurs d'événements
    removeListeners() {
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('wheel', this.handleWheel);
        this.el.removeEventListener('touchstart', this.touchStart);
        this.el.removeEventListener('touchend', this.touchEnd);
        document.body.removeEventListener('touchmove', this.handleTouchMove);
    }
}


export default WorksPage;
