import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Router, Routes, Route, useLocation } from "react-router-dom";
import { Header, Footer, PageTransition, ScrollToTop } from './components';
import Home from './Home';
import About from './pages/About';
import Contact from './pages/Contact';

import WrapperProjectPage from './pages/ProjectPage/WrapperProjectPage';
import NotFound from './pages/NotFound';

import FixedHeightCanvas from "./FixedHeightCanvas";


import CustomCursor from "./components/CustomCursor/CustomCursor";
import CustomCursorManager from "./components/CustomCursor/context/manager";



function App() {
  const location = useLocation();

  useEffect(() => {
    window.addEventListener('resize', disableTransitionsOnResize);

    return () => {
      window.removeEventListener('resize', disableTransitionsOnResize);
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
