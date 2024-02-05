import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
    this.run();
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
        uTexture: { value: new THREE.TextureLoader().load(this.props.imageUrl) }
      },
      side: THREE.DoubleSide
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  };

  addEvents = () => {
    window.requestAnimationFrame(this.run.bind(this));
    window.addEventListener('resize', this.onResize, false);

    // Ajout des gestionnaires d'événements pour le survol
    this.mount.addEventListener('mouseenter', this.onMouseEnter);
    this.mount.addEventListener('mouseleave', this.onMouseLeave);
  };

  run = () => {
    this.requestID = requestAnimationFrame(this.run);
    this.renderScene();
  };

  renderScene = () => {
    if (this.state.isHovered) {
      this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    }
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

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(w, h);
  };

  onMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  onMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    return <canvas ref={ref => (this.mount = ref)} style={{ width: '100%'}} />;
  }
}

export default WaveEffectImage;
