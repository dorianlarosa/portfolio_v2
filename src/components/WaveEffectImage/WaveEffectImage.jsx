import React, { Component } from 'react';
import * as THREE from 'three';

import vertexShader from "./glsl/vertex.glsl";
import fragmentShader from "./glsl/fragment.glsl";

class WaveEffectImage extends Component {
  state = {
    isHovered: false
  };

  componentDidMount() {
    this.initThree();
  }

  initThree = () => {
    const width = this.mount.clientWidth;
    const aspectRatio = 1920 / 1310;
    const height = width / aspectRatio;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.z = .42;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.mount,
      antialias: true,
    });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0xffffff, 1);

    this.clock = new THREE.Clock();

    this.createMesh();
    this.addEvents();

    this.start();
  };

  createMesh = () => {
    const aspectRatio = this.mount.clientWidth / this.mount.clientHeight;
    const height = 1;
    const width = height * aspectRatio;

    this.geometry = new THREE.PlaneGeometry(0.6, 0.4, 32, 32);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uProg: { value: 0 },
        uTexture: { value: new THREE.TextureLoader().load(this.props.imageUrl) }
      },
      side: THREE.DoubleSide
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  };

  addEvents = () => {
    window.requestAnimationFrame(this.animate.bind(this));
    window.addEventListener('resize', this.onResize, false);

    // Ajout des gestionnaires d'événements pour le survol
    this.mount.addEventListener('mouseenter', this.onMouseEnter);
    this.mount.addEventListener('mouseleave', this.onMouseLeave);
  };

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  animate = () => {
    this.frameId = requestAnimationFrame(this.animate);
    this.renderScene();
  };

  animateProperty = (startValue, endValue, duration) => {
    let startTime;
  
    const animate = (time) => {
      if (!startTime) startTime = time;
      const timeElapsed = time - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
  
      // Calculer la valeur actuelle de l'animation
      const currentValue = startValue + (endValue - startValue) * progress;
  
      // Appliquer la valeur animée
      this.material.uniforms.uProg.value = currentValue;
  
      // Continuer l'animation jusqu'à ce que le temps écoulé dépasse la durée
      if (timeElapsed < duration) {
        requestAnimationFrame(animate);
      }
    };
  
    requestAnimationFrame(animate);
  };

  renderScene = () => {
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    
    this.renderer.render(this.scene, this.camera);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    this.mount.removeEventListener('mouseenter', this.onMouseEnter);
    this.mount.removeEventListener('mouseleave', this.onMouseLeave);
    cancelAnimationFrame(this.requestID);
  }

  onResize = () => {
    const w = this.mount.parentElement.clientWidth;
    const aspectRatio = 1920 / 1310;
    const h = w / aspectRatio;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

  };

  onMouseEnter = () => {
    this.setState({ isHovered: true });
    this.animateProperty(0, 0.05, 500); // Commencer à 0, aller à 0.05 en 500 ms
  };

  onMouseLeave = () => {
    this.setState({ isHovered: false });
    this.animateProperty(0.05, 0, 500); // Revenir à 0 en 500 ms

  };

  render() {
    return <canvas ref={ref => (this.mount = ref)} style={{ width: '100%' }} />;
  }
}

export default WaveEffectImage;