import React, { Component } from 'react';
import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

import vertexShader3 from "./glsl/vertex3.glsl";
import fragmentShader3 from "./glsl/fragment3.glsl";

import vertexShader1 from "./glsl/vertex1.glsl";
import fragmentShader1 from "./glsl/fragment1.glsl";

import vertexShader2 from "./glsl/vertex2.glsl";
import fragmentShader2 from "./glsl/fragment2.glsl";

class BlobWithBackground extends Component {
    componentDidMount() {
        this.initThree();
    }

    initThree = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
    
        // Scène
        this.scene = new THREE.Scene();
    
        // Caméra
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.set(0, 0, 8);
    
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
    
        // Création de l'EffectComposer
        this.composer = new EffectComposer(this.renderer);
    
        // Création et ajout de RenderPass
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
    
        // Ici, créez et ajoutez votre customPass
        const myCustomShader = {
            uniforms: {
                "tDiffuse": { value: null },
                "u_scale": { value: .005 }
            },
            vertexShader: vertexShader2,
            fragmentShader: fragmentShader2
        };
    
        const customPass = new ShaderPass(myCustomShader);
        this.composer.addPass(customPass);
    
        // Ajout de GammaCorrectionShader comme ShaderPass
        const customGammaCorrection = {
            uniforms: {
                tDiffuse: { value: null },
                gammaFactor: { value: 2 }
            },
            vertexShader: vertexShader3, // Le shader de vertex ci-dessus
            fragmentShader: fragmentShader3 // Le shader de fragment ci-dessus
        };

        const gammaCorrectionPass = new ShaderPass(customGammaCorrection);
        this.composer.addPass(gammaCorrectionPass);

        this.clock = new THREE.Clock();

        // Création et ajout du mesh de fond à la scène
        this.createBackgroundMesh();

        // Création et ajout du mesh à la scène
        this.createBlobMesh();

        // Rendu de la scène
        this.animate();
    };

    createBackgroundMesh = () => {
        // Géométrie d'un plan couvrant tout le champ de vision
        const geometry = new THREE.IcosahedronGeometry(2, 20); // Pas besoin de s'inquiéter de la taille ici, car il s'adaptera à la caméra

        // Matériel avec votre shader
        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader1, // Assurez-vous que ce shader est approprié pour un fond
            fragmentShader: fragmentShader1,
            uniforms: {
                u_time: { value: 0 },
                u_patternScale: { value: 0.1 },
                u_patternBias1: { value: 0.5 },
                u_patternBias2: { value: 0.1 },
                u_firstColor: { value: new THREE.Color("#212121") },
                u_secondColor: { value: new THREE.Color("#000000") },
                u_accentColor: { value: new THREE.Color("#000000") }
            },
            depthWrite: false, // Empêche le fond de bloquer d'autres objets de la scène
            side: THREE.DoubleSide
        });

        // Mesh
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);

        this.backgroundMesh = mesh; // Stockez la référence pour l'animer si nécessaire
    };

    createBlobMesh = () => {
        // Géométrie
        const geometry = new THREE.IcosahedronGeometry(2, 20);

        // Matériel
        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader1,
            fragmentShader: fragmentShader1,
            uniforms: {
                u_time: { value: 0 },
                u_patternScale: { value: 0.1 },
                u_patternBias1: { value: 0.5 },
                u_patternBias2: { value: 0.1 },
                u_firstColor: { value: new THREE.Color("#212121") },
                u_secondColor: { value: new THREE.Color("#000000") },
                u_accentColor: { value: new THREE.Color("#000000") }
            },

        });

        // Mesh
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(1.5, 1.5, 1.5);
        mesh.position.set(0, 0, 0);
        this.scene.add(mesh); // Correction ici

        this.mesh = mesh;
    };

    animate = () => {
        requestAnimationFrame(this.animate);
        // Ajouter ici toute animation ou mise à jour de votre scène/mesh

        if (this.backgroundMesh) {
            this.backgroundMesh.position.copy(this.camera.position);
            this.backgroundMesh.material.uniforms.u_time.value += this.clock.getDelta(); // Assurez-vous que cette ligne est bien présente et correcte
        }

        // Mise à jour du temps dans les uniforms
        if (this.mesh) {
            this.mesh.material.uniforms.u_time.value = this.clock.getElapsedTime();
        }

        this.renderer.render(this.scene, this.camera);
        this.composer.render();

    };

    componentWillUnmount() {
        while (this.mount.firstChild) {
            this.mount.removeChild(this.mount.firstChild);
        }
    }

    render() {
        return <div ref={ref => (this.mount = ref)} id="container-blob" style={{ width: '100%', height: '100%' }} />;
    }
}

export default BlobWithBackground;
