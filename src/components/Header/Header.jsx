import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCustomCursor } from '../../hooks/useCustomCursor';
import "./Header.scss";
import gsap from 'gsap';
import backgroundNav from '../../assets/images/background-nav.jpg';

const Header = () => {
    const [headerVisible, setHeaderVisible] = useState(true);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const lastScrollY = useRef(window.scrollY);
    const { handleMouseEnter, handleMouseLeave } = useCustomCursor();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const scrollChangeStart = useRef(window.scrollY);
    const navRef = useRef(null); // Référence pour l'élément de navigation
    const navItemsRefs = useRef([]);
    navItemsRefs.current = []; // Réinitialiser pour s'assurer qu'il n'y a pas de fuite de mémoire

    // Ajoute les éléments à la référence
    const addToRefs = (el) => {
        if (el && !navItemsRefs.current.includes(el)) {
          navItemsRefs.current.push(el);
        }
      };

      useLayoutEffect(() => {
        // Assurez-vous que GSAP anime les éléments une fois qu'ils sont montés et visibles
        if (isBurgerOpen) {
            gsap.to(navRef.current, {
                x: 0,
                duration: 0.75,
                ease: "power3.out",
            });

            // Animer chaque nav item
            navItemsRefs.current.forEach((el, index) => {
                gsap.fromTo(el,
                    { opacity: 0, x: -50 },
                    { opacity: 1, x: 0, delay: index * 0.1 + .3, ease: 'power3.out' }
                );
            });

            console.log(navItemsRefs);

        } else {

            gsap.to(navRef.current, {
                x: '-100%',
                duration: 0.75,
                delay: .1,
                ease: "power3.in",
            });

             // Animer chaque nav item
             navItemsRefs.current.forEach((el, index) => {
                gsap.to(el,
                    { opacity: 0,duration: .5, ease: 'power3.out' }
                );
            });
        }
    }, [isBurgerOpen]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 767.98);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY.current;
            const distanceScrolled = Math.abs(currentScrollY - scrollChangeStart.current);

            if (scrollingDown) {
                if (distanceScrolled >= 50) {
                    setHeaderVisible(false);
                    scrollChangeStart.current = currentScrollY;
                }
            } else {
                if (distanceScrolled >= 50) {
                    setHeaderVisible(true);
                    scrollChangeStart.current = currentScrollY;
                }
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleBurger = () => {
        setIsBurgerOpen(!isBurgerOpen);
    };

    const closeBurger = () => {
        setIsBurgerOpen(false);
    };

    return (
        <header>
            <div id="header" style={{ opacity: headerVisible ? 1 : 0, transition: 'opacity 0.25s' }}>

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

                    <div className={`burger ${isBurgerOpen ? "open" : ""}`} onClick={toggleBurger} onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave}></div>
                    {!isMobile && (
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
                    )}
                </div>
            </div>
            {isMobile && (
                <nav ref={navRef} style={{ backgroundImage: `url('${backgroundNav}')` }} className='nav-mobile'>

                    <NavLink ref={addToRefs} className="nav-link" to="/" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave} onClick={closeBurger}>
                        Accueil
                    </NavLink>
                    <NavLink ref={addToRefs} className="nav-link" to="/a-propos" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave} onClick={closeBurger}>
                        A propos
                    </NavLink>
                    <NavLink ref={addToRefs} className="nav-link" to="/contact" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave} onClick={closeBurger}>
                        Contact
                    </NavLink>

                    <NavLink ref={addToRefs} className="nav-link mail" to="mailto:hello@dorianlarosa.fr" onMouseEnter={handleMouseEnter('arrow-mix-blend-mode')} onMouseLeave={handleMouseLeave}>

                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>


                        hello@dorianlarosa.fr

                    </NavLink>
                </nav>
            )}
        </header>
    );
};

export default Header;
