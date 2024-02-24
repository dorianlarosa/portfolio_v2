import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Router, Routes, Route, useLocation } from "react-router-dom";
import { Header, Footer, SvgFlower, ScrollToTop, LoaderSite } from './components';
import { useCustomCursor } from './hooks/useCustomCursor';
import Home from './Home';
import About from './pages/AboutPage/About';
import WorksPage from './pages/WorksPage/WorksPage';

import { useLenis } from '@studio-freight/react-lenis'; // Assurez-vous que cette importation est correcte

import WrapperProjectPage from './pages/ProjectPage/WrapperProjectPage';
import NotFound from './pages/NotFound';

import FixedHeightCanvas from "./components/three/FixedHeightCanvas";


import LenisController from './LenisController'; // Assurez-vous que le chemin d'importation est correct


import AOS from 'aos';
import 'aos/dist/aos.css'; // Importez le CSS d'AOS

import CustomCursor from "./components/CustomCursor/CustomCursor";
import CustomCursorManager from "./components/CustomCursor/context/manager";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const lenis = useLenis(); // Utilisez le hook pour obtenir l'instance de Lenis
  const [progress, setProgress] = useState(0); // Nouvel état pour le pourcentage de chargement

  // Fonction pour rafraîchir ScrollTrigger sur resize
  const handleResize = () => {
    ScrollTrigger.refresh();
  };
  useEffect(() => {
    // Ici, vous pouvez vérifier si toutes les données initiales sont chargées
    // ou simplement simuler un délai pour le loader
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop(); // Arrête le défilement géré par Lenis


    // Animation GSAP pour simuler le chargement
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        document.body.style.overflow = '';
        if (lenis) lenis.start(); // Reprend le défilement géré par Lenis
        setIsLoading(false);

      }
    });

    tl.to({}, {
      duration: 3, // Durée totale de la simulation de chargement
      ease: "power3.easeInOut", // Utilisez la fonction d'ease ici

      onUpdate: function () {
        const progress = this.progress() * 100;
        setProgress(progress); // Mise à jour du pourcentage de chargement
      }
    });

  }, []);

  useEffect(() => {
    AOS.init({
      // options ici
      duration: 1000, // Durée de l'animation en millisecondes
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', disableTransitionsOnResize);
    // window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', disableTransitionsOnResize);
      // window.removeEventListener('resize', handleResize);

    };
  }, []);

  let resizeTimer;

  function disableTransitionsOnResize() {
    const heightChange = Math.abs(window.innerHeight - lastHeight);
    const heightThreshold = 100; // Définissez un seuil approprié pour votre cas d'utilisation

    // Vérifie si le changement de hauteur dépasse un certain seuil
    if (heightChange > heightThreshold) {
      // La hauteur a beaucoup changé, ce qui peut indiquer une rotation ou un redimensionnement majeur
      document.body.classList.add('disable-transitions');

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove('disable-transitions');
      }, 100);
    }

    // Mise à jour de la dernière hauteur pour la prochaine comparaison
    lastHeight = window.innerHeight;
  }

  return (
    <CustomCursorManager>
      <FixedHeightCanvas isLoading={isLoading} />
      <CustomCursor />
      <LoaderSite isLoading={isLoading} progress={Math.round(progress)} currentPath={location.pathname} />
      {isLoading ? (
        <>

        </>
      ) : (
        <>
          <Header />
          <LenisController />

          <AnimatePresence mode='wait' initial={false} >
            <Routes key={location.pathname} location={location} >
              <Route path="/" exact element={<Home />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/projets" element={<WorksPage />} />
              <Route path="/projets/:slug" element={<WrapperProjectPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>

          {location.pathname !== '/projets' && <Footer />}
        </>

      )}


    </CustomCursorManager>
  );
}

export default App;
