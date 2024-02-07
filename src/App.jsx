import React from "react";
import { AnimatePresence } from "framer-motion";
import { Router, Routes, Route, useLocation } from "react-router-dom";
import { Header, Footer, PageTransition, ScrollToTop } from './components';
import Home from './Home';
import About from './pages/About';
import Contact from './pages/Contact';

import WrapperProjectPage from './pages/ProjectPage/WrapperProjectPage';
import NotFound from './pages/NotFound';

import FixedHeightCanvas from "./FixedHeightCanvas";


import { Stats } from '@react-three/drei';


function App() {
  const location = useLocation();

  return (
    <>
      <Stats></Stats>
      <Header />
    
      <FixedHeightCanvas/>
     
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
