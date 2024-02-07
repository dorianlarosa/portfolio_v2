import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { BackgroundSphere } from './components/three/BackgroundSphere';
import { BlobSphere } from './components/three/BlobSphere';
import { BlendFunction } from 'postprocessing';
import { EffectComposer, Noise, SMAA } from "@react-three/postprocessing";

const fixedHeight = window.innerHeight; // Exemple de hauteur fixe

const FixedHeightCanvas = () => {
  // Définissez la hauteur fixe que vous souhaitez pour votre canvas
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: fixedHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      // Ajustez seulement la largeur à la taille de la fenêtre, gardez la hauteur fixe
      setSize({ width: window.innerWidth, height: fixedHeight });
    };

    window.addEventListener('resize', handleResize);

    // Nettoyez l'écouteur d'événement lorsque le composant se démonte
    return () => window.removeEventListener('resize', handleResize);
  }, [fixedHeight]); // Dépendances de l'effet

  return (
    <Canvas
      id="container-blob"
      camera={{
        position: [0, 0, 1.3],
        fov: 50,
        aspect: size.width / size.height,
        near: 0.1,
        far: 2000,
      }}
      style={{ width: size.width, height: size.height }}
      dpr={window.devicePixelRatio * 0.5}
      antialias={true}
    >
       

       <BackgroundSphere />
        <BlobSphere />
        <EffectComposer >
          <Noise opacity={.1} blendFunction={BlendFunction.SOFT_LIGHT} />
        </EffectComposer>
    </Canvas>
  );
};

export default FixedHeightCanvas;