import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class WaveEffectImage extends Component {
    componentDidMount() {
        this.initThree();
    }



    initThree = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        const vertexShader = `varying vec2 vUv;
        uniform float uTime;
        
        void main() {
        vUv = uv;
        
        vec3 pos = position;
        float noiseFreq = 3.5;
        float noiseAmp = 0.15; 
        vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
        pos.z += snoise(noisePos) * noiseAmp;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
        }`;

        const fragmentShader = `varying vec2 vUv;
        uniform sampler2D uTexture;
        
        void main() {
        vec3 texture = texture2D(uTexture, vUv).rgb;
        gl_FragColor = vec4(texture, 1.);
        }`;

        // Scène, caméra et renderer
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);

        // Ajout de contrôles (optionnel)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // Création d'un maillage avec une texture
        const geometry = new THREE.PlaneGeometry(5, 3, 32, 32); // Ajustez ces valeurs comme nécessaire
        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader, // Remplacez vertexShader par votre shader de sommet
            fragmentShader: fragmentShader, // Remplacez fragmentShader par votre shader de fragment
            uniforms: {
                uTime: { value: 0.0 },
                uTexture: { value: new THREE.TextureLoader().load(this.props.imageUrl) },
            },
            // wireframe: true,
            side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);

        this.camera.position.z = 2.4;

        this.animate();
    };

    animate = () => {
        requestAnimationFrame(this.animate);

        // Animation ou mise à jour de la scène

        this.renderer.render(this.scene, this.camera);
    };

    componentWillUnmount() {
        this.mount.removeChild(this.renderer.domElement); // Nettoyage
    }

    render() {
        return <div ref={(ref) => (this.mount = ref)} style={{ width: '100%', height: '100%' }} />;
    }
}

export default WaveEffectImage;