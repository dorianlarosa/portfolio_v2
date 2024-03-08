import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { BackgroundSphere } from './BackgroundSphere';
import { BlobSphere } from './BlobSphere';
// import { BlendFunction } from 'postprocessing';
// import { EffectComposer, Noise, SMAA } from "@react-three/postprocessing";
import * as THREE from 'three';
// import { Perf } from 'r3f-perf'

const fixedHeight = window.innerHeight; // Exemple de hauteur fixe

// Votre hook personnalisé pour contrôler la caméra
const useCameraController = () => {
  const { camera } = useThree(); // Ceci est l'importation manquante qui causait l'erreur

  useFrame(({ pointer }) => {
    // Logique pour ajuster la position de la caméra basée sur la position de la souris
    const x = pointer.x / 2.5;
    const y = pointer.y / 2.5;

    const maxX = 1; // Limite maximale sur l'axe X
    const minX = -1; // Limite minimale sur l'axe X
    const maxY = 1; // Limite maximale sur l'axe Y
    const minY = -1; // Limite minimale sur l'axe Y

    // Calcul de la nouvelle position souhaitée basée sur la position de la souris
    const targetX = pointer.x * 2;
    const targetY = pointer.y * 2;

    // Application des limites pour s'assurer que la caméra reste dans la plage spécifiée
    const clampedX = Math.max(minX, Math.min(maxX, targetX));
    const clampedY = Math.max(minY, Math.min(maxY, targetY));

    camera.position.x += (x - camera.position.x) * 0.05;
    camera.position.y += (y - camera.position.y) * 0.05;

    camera.lookAt(new THREE.Vector3(0, 0, 0));
  });
};

// Déplacez la logique de contrôle de la caméra dans un composant séparé
function CameraController() {
  useCameraController(); // Utilisez le hook ici
  return null; // Ce composant ne rend rien visuellement
}


const FixedHeightCanvas = ({ isLoading, location }) => {
  const [isIntersecting, setIntersecting] = useState(true); // Supposons que c'est visible par défaut
  const [isActive, setActive] = useState(true);
  // Initialisation des états pour la taille du canvas et la largeur précédente de la fenêtre
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: "100svh", // Utilisation de la hauteur initiale de la fenêtre
  });
  const [prevWindowWidth, setPrevWindowWidth] = useState(window.innerWidth);
  const prevPath = useRef(location.pathname);
  useEffect(() => {

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      // Vérifiez si la largeur de la fenêtre a changé
      // Mise à jour de la largeur et de la hauteur si la largeur de la fenêtre a changé
      setSize({ width: currentWidth, height: "100svh" });

    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [prevWindowWidth]); // Ajoutez prevWindowWidth dans le tableau des dépendances


  useEffect(() => {
    const observerCallback = (entries) => {
      const entry = entries[0];
      setIntersecting(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.1,
    });

    const canvasElement = document.getElementById('container-blob');
    if (canvasElement) observer.observe(canvasElement);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Détecte si le chemin a changé (changement de page)
    if (location.pathname != '/') {
      setTimeout(() => {
        setActive(false); // Désactivez après un délai si le chemin a changé

      }, 2000); // Délai de 2 secondes
      // Appliquez un délai uniquement lors du changement de page

      prevPath.current = location.pathname;
    } else if (isIntersecting) {
      setActive(true);
    } else {
      setActive(false);

    }

    // Ce hook dépend de l'intersection et du changement de route
  }, [location, isIntersecting]);

  return (
    <Canvas
      id="container-blob"
      camera={{
        position: [0, 0, 1.5],
        fov: 50,
        aspect: size.width / size.height,
        near: 0.1,
        far: 2000,
      }}
      style={{ width: size.width, height: size.height }}
      dpr={window.devicePixelRatio * 1}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
      shadows={false}
      frameloop={isActive ? "always" : "never"}          >
      {/* <Perf position="top-left" /> */}

      <CameraController />
      <BackgroundSphere />
      <BlobSphere isLoading={isLoading} location={location} />

    </Canvas>
  );
};

export default FixedHeightCanvas;