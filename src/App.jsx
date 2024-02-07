import React from "react";
import { AnimatePresence } from "framer-motion";
import { Router, Routes, Route, useLocation } from "react-router-dom";
import { Header, Footer, PageTransition, ScrollToTop } from './components';
import Home from './Home';
import About from './pages/About';
import Contact from './pages/Contact';

import WrapperProjectPage from './pages/ProjectPage/WrapperProjectPage';
import NotFound from './pages/NotFound';

import { Canvas } from '@react-three/fiber';
import { BackgroundSphere } from './components/three/BackgroundSphere';
import { BlobSphere } from './components/three/BlobSphere';
import { BlendFunction } from 'postprocessing';
import { EffectComposer, Noise, SMAA } from "@react-three/postprocessing";

import AnimatedCursor from "react-animated-cursor"


function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <Canvas
        id="container-blob"
        camera={{
          position: [0, 0, 1.3],
          fov: 50,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.1,
          far: 2000
        }}
        dpr={window.devicePixelRatio}>

        <BackgroundSphere />
        <BlobSphere />

        <EffectComposer >
          <Noise opacity={.2} blendFunction={BlendFunction.SOFT_LIGHT} />
          <SMAA />
        </EffectComposer>

      </Canvas>
      <AnimatedCursor
        className="cursor"
        innerSize={8}
        outerSize={40}
        innerStyle={{
          background: '#fff',
          mixBlendMode: 'difference'
        }}
        hasBlendMode={true}
        outerStyle={{
          background: '#ffffff00',
          border: '1px solid var(--white-color)',
          mixBlendMode: 'difference'
        }}
        outerAlpha={1}
        innerScale={5}
        outerScale={1}
        
      />



      {console.log(location.pathname)}
      <AnimatePresence mode='wait' initial={false} >
        <ScrollToTop />

        <Routes key={location.pathname} location={location} >
          <Route path="/" exact element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projets/:slug" element={<WrapperProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </AnimatePresence>

      <Footer />
    </>
  );
}

export default App;
