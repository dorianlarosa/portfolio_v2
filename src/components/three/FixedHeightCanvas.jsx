import React, { useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { BackgroundSphere } from './BackgroundSphere';
import { BlobSphere } from './BlobSphere';
import { BlendFunction } from 'postprocessing';
import { EffectComposer, Noise, SMAA } from "@react-three/postprocessing";
import * as THREE from 'three';

const fixedHeight = window.innerHeight; // Exemple de hauteur fixe

// Votre hook personnalisé pour contrôler la caméra
const useCameraController = () => {
  const { camera } = useThree(); // Ceci est l'importation manquante qui causait l'erreur

  useFrame(({ pointer }) => {
    // Logique pour ajuster la position de la caméra basée sur la position de la souris
    const x = pointer.x / 2;
    const y = pointer.y / 2;

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


const FixedHeightCanvas = ({ isLoading }) => {

  // Initialisation des états pour la taille du canvas et la largeur précédente de la fenêtre
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: "100vh", // Utilisation de la hauteur initiale de la fenêtre
  });
  const [prevWindowWidth, setPrevWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      // Vérifiez si la largeur de la fenêtre a changé
        // Mise à jour de la largeur et de la hauteur si la largeur de la fenêtre a changé
        setSize({ width: currentWidth, height: "100vh" });
  
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [prevWindowWidth]); // Ajoutez prevWindowWidth dans le tableau des dépendances

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
      dpr={window.devicePixelRatio * 0.5}
      antialias={'false'}
    >
      <CameraController />
      <BackgroundSphere />
      <BlobSphere isLoading={isLoading} />
      <EffectComposer >
        <Noise opacity={0} blendFunction={BlendFunction.SOFT_LIGHT} />
      </EffectComposer>
    </Canvas>
  );
};

export default FixedHeightCanvas;