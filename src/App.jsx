import React, { Component } from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

// import luge from '@waaark/luge';
// import '@waaark/luge/dist/css/luge.css';

import LocomotiveScroll from 'locomotive-scroll';



import { Header } from './components';

import Home from './Home';
import About from './pages/About';
import WrapperProjectPage from './pages/ProjectPage/WrapperProjectPage';

import NotFound from './pages/NotFound';

class App extends Component {

  componentDidMount() {
    // luge.settings({
    //   smooth: { // smooth géré par lenis
    //     disabled: true
    //   }
    // })

    /* Locomotive scroll instance */
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
          wrapper: window,
          content: document.documentElement,
          lerp: 0.1,
          duration: 1.5,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          smoothTouch: false,
          wheelMultiplier: .7,
          touchMultiplier: 2,
          normalizeWheel: true,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      },
  });
  
  }

  render() {

    return (

      <>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/projets/:slug" element={<WrapperProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>

    )
  }
}

export default App
