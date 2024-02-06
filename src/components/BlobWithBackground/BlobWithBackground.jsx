import React, { Component } from 'react';
import * as THREE from 'three';

import vertexShader from "./glsl/vertex.glsl";
import fragmentShader from "./glsl/fragment.glsl";

import vertexShader1 from "./glsl/vertex1.glsl";
import fragmentShader1 from "./glsl/fragment1.glsl";

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
        // this.renderer.setClearColor(0x0a0a0a, 1);
        this.mount.appendChild(this.renderer.domElement);

        // Lumière TODO ???????????
        // const light = new THREE.PointLight(0xf0f0f0, 1, 1);
        // light.position.set(100, 10, 10);
        // this.scene.add(light);


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
                u_patternScale: { value: 0.09 },
                u_patternBias1: { value: 0.43 },
                u_patternBias2: { value: 0.1 },
                u_firstColor: { value: new THREE.Color("#898989") },
                u_secondColor: { value: new THREE.Color("#6C6C6C") },
                u_accentColor: { value: new THREE.Color("#303030") }
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
                u_patternScale: { value: 0.09 },
                u_patternBias1: { value: 0.43 },
                u_patternBias2: { value: 0.1 },
                u_firstColor: { value: new THREE.Color("#898989") },
                u_secondColor: { value: new THREE.Color("#6C6C6C") },
                u_accentColor: { value: new THREE.Color("#303030") }
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
