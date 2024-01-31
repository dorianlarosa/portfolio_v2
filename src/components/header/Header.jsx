import React, { Component } from "react";
import { NavLink, Link } from 'react-router-dom';

import "./Header.scss";

class Header extends Component {

    render() {

        return (
            <header id="header" className="container">
                <Link to="/" className="text-h6">
                    <svg
                        version="1.1"
                        id="logo"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 340 484"
                        style={{ enableBackground: 'new 0 0 1645.8 484' }}
                        xmlSpace="preserve"
                    >
                        <g>
                            <circle className="st0" cx="147" cy="144" r="127.5" />
                            <polygon className="st0" points="115.8,274.5 116.1,327.5 63.1,274.5 116.1,221.5" />
                            <path className="st0" d="M148.6,20.2l172.9,134.3l-157,245L146.6,21.2C146.6,20.1,147.8,19.5,148.6,20.2z" />
                            <rect x="170.5" y="174.5" className="st0" width="128" height="108" />
                            <polyline className="st0" points="154.7,191.5 42.5,346.5 192.5,459.5 176.5,174.5" />
                            <polyline className="st0" points="298.5,244.6 248.5,212.5 298.5,219" />
                            <polygon className="st1" points="238.7,111.9 212.5,121.3 249.5,134.1" />
                        </g>
                    </svg>
                </Link>

                <nav>
                    <NavLink className="nav-link" to="/">
                        Accueil
                    </NavLink>
                    <NavLink className="nav-link" to="/a-propos">
                        A propos
                    </NavLink>

                </nav>
            </header>
        );
    }
}

export default Header
