import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Global.scss'
import { ReactLenis } from '@studio-freight/react-lenis'

import { BrowserRouter } from 'react-router-dom'

// const optionsLenis = {
//   duration: 2, // Durée du défilement en secondes
//   wheelMultiplier : .7
// };


ReactDOM.createRoot(document.getElementById('root')).render(
  // <ReactLenis options={optionsLenis} root>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
  // </ReactLenis>
)
