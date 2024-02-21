import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './Global.scss';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { LoaderSite } from './components';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { BrowserRouter } from 'react-router-dom';

const optionsLenis = {
  // duration: 2, // Durée du défilement en secondes
  // wheelMultiplier: 1,
  // lerp: .5
};

function LenisGSAPWrapper() {
  const lenis = useLenis();

  useEffect(() => {
    const update = (time) => {
      lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenis]); // Ajout de lenis comme dépendance à useEffect pour se réabonner si l'instance de lenis change

  return <App />;
}

function AppWithLenis() {


  return (
    <React.StrictMode>

        <BrowserRouter>
          <ReactLenis options={optionsLenis} root autoRaf={false}>
            <LenisGSAPWrapper />
          </ReactLenis>
        </BrowserRouter>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWithLenis />);
