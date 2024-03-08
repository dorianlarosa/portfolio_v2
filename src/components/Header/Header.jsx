import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCustomCursor } from '../../hooks/useCustomCursor';
import "./Header.scss";
import gsap from 'gsap';
import backgroundNav from '../../assets/images/background-nav.jpg';
import { useLenis } from '@studio-freight/react-lenis'; // Assurez-vous que cette importation est correcte
// import AOS from 'aos';
// import 'aos/dist/aos.css'; // Importez le CSS d'AOS

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
    const navigate = useNavigate();


    // État pour suivre si c'est le premier chargement
    const [isFirstLoad, setIsFirstLoad] = useState(true);


    // Ajoute les éléments à la référence
    const addToRefs = (el) => {
        if (el && !navItemsRefs.current.includes(el)) {
            navItemsRefs.current.push(el);
        }
    };

    // Fonction pour conditionnellement appliquer les attributs AOS
    const getAosAttributes = (delay) => {
        return isFirstLoad ? { 'data-aos': 'fade', 'data-aos-delay': delay } : {};
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

        } else {
            if (navRef.current) {
                gsap.to(navRef.current, {
                    x: '-100%',
                    duration: 0.75,
                    delay: .1,
                    ease: "power3.in",
                });
            }

            // Animer chaque nav item
            navItemsRefs.current.forEach((el, index) => {
                gsap.to(el,
                    { opacity: 0, duration: .5, ease: 'power3.out' }
                );
            });
        }
    }, [isBurgerOpen]);

    useEffect(() => {
        // Définir à false après le premier rendu
        setIsFirstLoad(false);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 767.98);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const lenis = useLenis(); // Utilisez le hook pour obtenir l'instance de Lenis

    useEffect(() => {
        // Si le menu burger est ouvert, arrêter le défilement Lenis
        if (isBurgerOpen) {
            document.body.style.overflow = 'hidden';
            if (lenis) lenis.stop(); // Arrête le défilement géré par Lenis
        } else {
            document.body.style.overflow = '';
            if (lenis) lenis.start(); // Reprend le défilement géré par Lenis
        }
    }, [isBurgerOpen, lenis]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY.current;
            const distanceScrolled = Math.abs(currentScrollY - scrollChangeStart.current);
            if (currentScrollY > 100) { // Gardez le header visible si moins de 100px ont été défilés
                if (scrollingDown) {
                    if (distanceScrolled >= 50) { // Ajusté à 100px
                        setHeaderVisible(false);
                        scrollChangeStart.current = currentScrollY;
                    }
                } else {
                    if (distanceScrolled >= 50) { // Ajusté à 100px
                        setHeaderVisible(true);
                        scrollChangeStart.current = currentScrollY;
                    }
                    setHeaderVisible(true);
                }
            } else {
                setHeaderVisible(true);

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

    const closeBurgerForClickNavItem = (e) => {
        const targetHref = e.currentTarget.getAttribute('href');
        e.preventDefault();

        if (location.pathname !== targetHref) {
            gsap.to(navItemsRefs.current, {
                opacity: 0,
                duration: 0.25,
                ease: "power3.in",
                onComplete: () => {
                    gsap.to(navRef.current, {
                        x: "-100%",
                        delay: .7,
                        duration: 0,
                        onComplete: () => {
                            setIsBurgerOpen(false);
                        }
                    });

                    navigate(targetHref);
                }
            });
        } else {
            setIsBurgerOpen(false);
        }
    };

    return (
        <header>
            <div id="header" style={{ opacity: headerVisible ? 1 : 0, transition: 'opacity 0.25s' }}>

                <div className="container content-header">
                    <Link
                        data-aos="fade"
                        data-aos-delay={300}
                        to="/" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave}>
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

                    <div data-aos="fade"
                        data-aos-delay={300}>

                        <div

                            className={`burger ${isBurgerOpen ? "open" : ""}`}
                            onClick={toggleBurger} onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave}>


                        </div>
                    </div>

                    {!isMobile && (
                        <nav>
                            <NavLink
                                className="nav-link"
                                to="/"
                                onMouseEnter={handleMouseEnter("link")}
                                onMouseLeave={handleMouseLeave}
                            >

                                <span data-aos="fade" data-aos-delay={450}>
                                    Accueil

                                </span>
                            </NavLink>


                            <NavLink
                                className="nav-link" to="/projets" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave}>
                                <span
                                    data-aos="fade"
                                    data-aos-delay={600}>Projets</span>

                            </NavLink>

                            <NavLink
                                className="nav-link" to="/a-propos" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave}>
                                <span
                                    data-aos="fade"
                                    data-aos-delay={750}>A propos</span>

                            </NavLink>



                            <NavLink
                                data-aos="fade"
                                className="nav-link" to="mailto:hello@dorianlarosa.fr" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave}>
                                <svg
                                    width={15}
                                    height={15}
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    data-aos="fade"
                                    data-aos-delay={900}
                                >
                                    <path
                                        d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    />
                                </svg>

                            </NavLink>
                        </nav>
                    )}
                </div>
            </div>
            {isMobile && (
                <nav ref={navRef} style={{ backgroundImage: `url('${backgroundNav}')` }} className='nav-mobile'>

                    <NavLink ref={addToRefs} className="nav-link" to="/" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave} onClick={closeBurgerForClickNavItem}>
                        Accueil
                    </NavLink>
                    <NavLink ref={addToRefs} className="nav-link" to="/projets" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave} onClick={closeBurgerForClickNavItem}>
                        Projets
                    </NavLink>
                    <NavLink ref={addToRefs} className="nav-link" to="/a-propos" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave} onClick={closeBurgerForClickNavItem}>
                        A propos
                    </NavLink>

                    <NavLink ref={addToRefs} className="nav-link mail" to="mailto:hello@dorianlarosa.fr" onMouseEnter={handleMouseEnter('arrow-mix-blend-mode')} onMouseLeave={handleMouseLeave}>

                        <svg
                            width={15}
                            height={15}
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            />
                        </svg>


                        hello@dorianlarosa.fr

                    </NavLink>
                </nav>
            )}
        </header>
    );
};

export default Header;
