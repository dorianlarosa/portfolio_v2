import React, {useState, useEffect} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCustomCursor } from '../../hooks/useCustomCursor';
import "./Header.scss";

const Header = () => {
    const [lastScrollY, setLastScrollY] = useState(0);
    const { handleMouseEnter, handleMouseLeave } = useCustomCursor();

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY;

        // Sélectionnez l'élément que vous souhaitez modifier
        const headerElement = document.getElementById('header');

        if (headerElement) {
            if (scrollingDown) {
                // Ajouter une classe si l'utilisateur fait défiler vers le bas
                headerElement.classList.add('scrolling-down');
                headerElement.classList.remove('scrolling-up');
            } else {
                // Ajouter une classe différente si l'utilisateur fait défiler vers le haut
                headerElement.classList.remove('scrolling-down');
                headerElement.classList.add('scrolling-up');
            }
        }

        // Mise à jour de la dernière position de défilement
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        // Ajouter le gestionnaire d'événements au montage
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Nettoyer le gestionnaire d'événements au démontage
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <header id="header">
            <div className="container content-header">
                <Link to="/" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave}>                    
                <svg
                    version="1.1"
                    id="logo"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 340 484"
                    style={{ enableBackground: 'new 0 0 340 484' }}
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

                <div className="hamburger hamburger--spin">
                    <div className="hamburger-box">
                        <div className="hamburger-inner"></div>
                    </div>
                </div>

                <nav>
                    <NavLink className="nav-link" to="/" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave}>
                        Accueil
                    </NavLink>
                    <NavLink className="nav-link" to="/a-propos" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave}>
                        A propos
                    </NavLink>
                    <NavLink className="nav-link" to="/contact" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave}>
                        Contact
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
