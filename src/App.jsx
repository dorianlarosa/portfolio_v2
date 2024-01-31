import './Library.scss';
import React, { Component } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import Page1 from './pages/About';
import Home from './Home';


class App extends Component {

  render() {

    return (
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
      </Routes>
    )
  }
}

export default App
