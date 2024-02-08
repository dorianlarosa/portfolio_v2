import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { BackgroundSphere } from './components/three/BackgroundSphere';
import { BlobSphere } from './components/three/BlobSphere';
import { BlendFunction } from 'postprocessing';
import { EffectComposer, Noise, SMAA } from "@react-three/postprocessing";

const fixedHeight = window.innerHeight; // Exemple de hauteur fixe

const FixedHeightCanvas = () => {
  // Initialisation des états pour la taille du canvas et la largeur précédente de la fenêtre
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight, // Utilisation de la hauteur initiale de la fenêtre
  });
  const [prevWindowWidth, setPrevWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      // Vérifiez si la largeur de la fenêtre a changé
      if (currentWidth !== prevWindowWidth) {
        // Mise à jour de la largeur et de la hauteur si la largeur de la fenêtre a changé
        setSize({ width: currentWidth, height: window.innerHeight });
      } else {
        // Optionnel: ajustez ici si vous souhaitez un comportement spécifique lorsque seule la hauteur change
      }
      // Mise à jour de la largeur précédente de la fenêtre
      setPrevWindowWidth(currentWidth);
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
        position: [.8, .4, 1.3],
        fov: 50,
        aspect: size.width / size.height,
        near: 0.1,
        far: 2000,
      }}
      style={{ width: size.width, height: size.height }}
      dpr={window.devicePixelRatio * 0.5}
      antialias={'false'}
      onCreated={({ camera }) => {
        // Vous pouvez ajuster la position de la caméra ici en fonction de la position du blob
      // camera.lookAt(new THREE.Vector3(blobX, blobY, blobZ));
      }}
    >
       

       <BackgroundSphere />
        <BlobSphere />
        <EffectComposer >
          <Noise opacity={.15} blendFunction={BlendFunction.SOFT_LIGHT} />
        </EffectComposer>
    </Canvas>
  );
};

export default FixedHeightCanvas;