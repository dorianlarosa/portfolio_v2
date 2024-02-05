import React, { createContext, Component } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

const ScrollContext = createContext();

class ScrollLocomotiveProvider extends Component {
  constructor(props) {
    super(props);
    this.scrollInstance = null;
  }

  componentDidMount() {
    this.scrollInstance = new LocomotiveScroll({
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

  componentWillUnmount() {
    if (this.scrollInstance) {
      this.scrollInstance.destroy();
    }
  }

  render() {
    return (
      <ScrollContext.Provider value={{ scrollInstance: this.scrollInstance }}>
      {this.props.children}
    </ScrollContext.Provider>
    );
  }
}

export { ScrollContext, ScrollLocomotiveProvider };

