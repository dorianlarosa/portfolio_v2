import React, { Component } from "react";
import {
  SvgFlower
} from "..";

import "./Footer.scss";


class Footer extends Component {

  render() {

    return (
      <>
        <footer id="footer">
          <div className="container">
            <div className="content-footer">

              <div className="title">
                <SvgFlower />
                <h2>Me contacter</h2>
              </div>

              <a className="mail" href="mailto:hello@dorianlarosa.fr">hello@dorianlarosa.fr</a>
            </div>

            <div className="credits">
              <p>Made with 🤍 from France</p>
            </div>
          </div>

        </footer>

      </>
    );
  }
}

export default Footer
