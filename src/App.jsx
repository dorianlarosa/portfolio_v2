import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Router, Routes, Route, useLocation } from "react-router-dom";
import { Header, Footer, SvgFlower, ScrollToTop } from './components';
import { useCustomCursor } from './hooks/useCustomCursor';
import Home from './Home';
import About from './pages/About';
import Contact from './pages/Contact';

import WrapperProjectPage from './pages/ProjectPage/WrapperProjectPage';
import NotFound from './pages/NotFound';

import FixedHeightCanvas from "./components/three/FixedHeightCanvas";


import CustomCursor from "./components/CustomCursor/CustomCursor";
import CustomCursorManager from "./components/CustomCursor/context/manager";



function App() {
  const { handleMouseEnter, handleMouseLeave } = useCustomCursor();

  const location = useLocation();

   // Fonction pour rafraîchir ScrollTrigger sur resize
   const handleResize = () => {
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    window.addEventListener('resize', disableTransitionsOnResize);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', disableTransitionsOnResize);
      window.removeEventListener('resize', handleResize);

    };
  }, []);

  let resizeTimer;

  function disableTransitionsOnResize() {
    // Ajoute la classe pour désactiver les transitions
    document.body.classList.add('disable-transitions');

    // Efface le timer précédent pour s'assurer qu'il ne s'exécute qu'une fois après la fin du redimensionnement
    clearTimeout(resizeTimer);

    // Réactive les transitions après un court délai une fois le redimensionnement terminé
    resizeTimer = setTimeout(() => {
      document.body.classList.remove('disable-transitions');
    }, 100); // 100 ms est un délai couramment utilisé, mais vous pouvez l'ajuster selon vos besoins
  }

  

  return (
    <CustomCursorManager>

      <Header />
      <FixedHeightCanvas />
      <CustomCursor />

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
    </CustomCursorManager>
  );
}

export default App;
