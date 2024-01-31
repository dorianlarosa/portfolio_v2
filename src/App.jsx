import './Library.scss';
import React, { Component } from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import  { Header } from './components';

import About from './pages/About';
import NotFound from './pages/NotFound';

import Home from './Home'; 


class App extends Component {

  render() {

    return (

      <>
        <Header/>
        
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>

    )
  }
}

export default App
