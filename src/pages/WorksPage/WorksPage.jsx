import React, { Component } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import "./WorksPage.scss";
import data from '../../api/data.json';
import { PageTransition } from "../../components";


class WorksPage extends Component {
    constructor(props) {
        super(props);
        this.slider = null;
    }

    componentDidMount() {
        this.slider = new Slider();
        this.slider.init();
    }

    componentWillUnmount() {
        // Assurez-vous de nettoyer les écouteurs d'événements ou les ressources lorsque le composant est démonté
        // Par exemple :
        // window.removeEventListener('wheel', this.slider.nextSlide);
    }

    render() {
        return (
            <>
                <section id="section-slide-works">
                    <div className="slider js-slider" ref={this.sliderRef}>
                        <div className="slider__inner js-slider__inner" ref={this.sliderInner}>
                            <div className="overlay">
                            </div></div>

                        {data.projects.map(project => (
                            <div key={project.id} className="slide js-slide">
                                <div className="slide__content">
                                    <figure className="slide__img js-slide__img">
                                        {/* Vous pouvez choisir d'afficher background ou thumbnail ici */}
                                        <img src={project.thumbnail} alt={project.name} />
                                    </figure>
                                </div>
                                <div className="slider__text js-slider__text">
                                    <div className="slider__text-line js-slider__text-line"><div>{project.name}</div></div>
                                    <div className="slider__text-line js-slider__text-line"><div className='text'>{project.description}</div></div>

                                    {/* Ajoutez plus de détails de projet ici si nécessaire */}
                                </div>
                            </div>
                        ))}

                        <nav className="slider__nav js-slider__nav">

                            {data.projects.map((project, index) => (
                                <div className="slider-bullet js-slider-bullet">
                                    <span className="slider-bullet__text js-slider-bullet__text">{index + 1}</span>
                                    <div className="slider-bullet__container-line">
                                        <span className="slider-bullet__container-line__line js-slider-bullet__line"></span>
                                    </div>

                                </div>
                            ))}

                        </nav>

                        {/* <div className="scroll js-scroll">Scroll</div> */}
                    </div>
                </section>
                <PageTransition />

            </>
        );
    }
}

class Slider {
    constructor() {
        this.bindAll()

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

    bindAll() {
        ['render', 'nextSlide', 'onWindowResize']
            .forEach(fn => this[fn] = this[fn].bind(this))
    }

    updateBullets(targetIndex) {
        this.bullets.forEach((bullet, index) => {
            const txt = bullet.querySelector('.js-slider-bullet__text');
            const line = bullet.querySelector('.js-slider-bullet__line');

            if (index === targetIndex) {
                gsap.to(txt, { alpha: 1, duration: 1 });
                gsap.to(line, { scaleX: 1, duration: 1, transformOrigin: 'left', ease: "none" });
            } else {
                gsap.to(txt, { alpha: 0.25, duration: 1 });
                gsap.to(line, { scaleX: 0, duration: 1, transformOrigin: 'left', ease: "none" });
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

            gsap.set(slide, { autoAlpha: 0 })
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
            duration: 2,
            ease: "expo.inOut",
            onUpdate: this.render,
            onComplete: () => {
                console.log("Animation Complete"); // Ajoutez cette ligne pour le débogage

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

        // Animation spécifique à la direction
        const currentSlide = this.slides[this.data.current];
        const targetSlide = this.slides[targetIndex];

        // Configuration de l'animation pour la slide courante et la cible
        const tl = gsap.timeline({ paused: true });
        tl.to(currentSlide, {
            autoAlpha: 0,
            duration: 1,
            y: -200,
            ease: "back.in(1.7)",

        }).fromTo(targetSlide, {
            autoAlpha: 0,
            y: 200,
        }, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.7)",

        });

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
        this.listeners()
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
    }
}

export default WorksPage;
