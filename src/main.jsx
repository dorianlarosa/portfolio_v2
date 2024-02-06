import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Global.scss'
import { ReactLenis } from '@studio-freight/react-lenis'
import { ParallaxProvider } from 'react-scroll-parallax';


import { BrowserRouter } from 'react-router-dom'

const optionsLenis = {
  duration: 2, // Durée du défilement en secondes
  wheelMultiplier: .9
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <ReactLenis options={optionsLenis} root>
    <ParallaxProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ParallaxProvider>
  </ReactLenis>
)
