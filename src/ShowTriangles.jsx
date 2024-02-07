import React from 'react';
import { useThree } from '@react-three/fiber';

const ShowTriangles = () => {
  const { gl } = useThree(); // gl est l'instance du renderer WebGL de Three.js

  React.useEffect(() => {
    console.log("Number of Triangles :", gl.info.render.triangles);
  }, [gl.info.render.triangles]); // Ce useEffect se déclenchera à chaque fois que le nombre de triangles change.

  return null; // Ce composant ne rend rien visuellement
};

export default ShowTriangles;