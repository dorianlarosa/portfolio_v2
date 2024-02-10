import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCustomCursor } from '../../hooks/useCustomCursor';
import "./Header.scss";
import { motion } from 'framer-motion';
import backgroundNav from '../../assets/images/background-nav.jpg';


const Header = () => {
    const [headerVisible, setHeaderVisible] = useState(true);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const lastScrollY = useRef(window.scrollY);
    const { handleMouseEnter, handleMouseLeave } = useCustomCursor();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const scrollChangeStart = useRef(window.scrollY); // Pour suivre le début du changement de défilement
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
                if (distanceScrolled >= 50) { // Ne changez que si l'utilisateur a fait défiler de plus de 50px
                    setHeaderVisible(false);
                    scrollChangeStart.current = currentScrollY; // Réinitialiser le point de départ du changement
                }
            } else {
                if (distanceScrolled >= 50) { // Appliquez la même logique pour le défilement vers le haut
                    setHeaderVisible(true);
                    scrollChangeStart.current = currentScrollY; // Réinitialiser le point de départ du changement
                }
            }

            lastScrollY.current = currentScrollY; // Mise à jour de la dernière position de défilement
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleMouseEnter, handleMouseLeave]);


    const toggleBurger = () => {
        setIsBurgerOpen(!isBurgerOpen);
    };

    const closeBurger = () => {
        setIsBurgerOpen(false);
    };

    const navVariants = {
        open: { x: 0 },
        closed: { x: "-100%" },
    };

    const linkVariants = {
        open: (custom) => ({
            x: [custom.x, 0], 
            opacity: 1,
            transition: { duration: custom.duration, delay: custom.delay, ease: "easeInOut" }
        }),
        closed: {
            x:0,
            opacity: 0,
            transition: { duration: 0.25, ease: "easeInOut" }
        },
    };

    return (
        <header>
            <motion.div
                id="header"
                initial={{ opacity: 1 }}
                animate={{ opacity: headerVisible ? 1 : 0 }}
                transition={{ duration: 0.25 }}
            >


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
            </motion.div>
            {isMobile && (
                <motion.nav
                    style={{ backgroundImage: `url('${backgroundNav}')` }}
                    className='nav-mobile'
                    initial="closed"
                    animate={isBurgerOpen ? "open" : "closed"}
                    variants={navVariants}
                    duration={1}
                    transition={isBurgerOpen ? { duration: .75, ease: [.75, 0, .25, 1] } : { duration: .75, delay: 0.15, ease: [.75, 0, .25, 1] }}
                >
                    <motion.div variants={linkVariants} custom={{ x: -30, delay: .45 }}>
                        <NavLink className="nav-link" to="/" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave} onClick={closeBurger}>
                            Accueil
                        </NavLink>
                    </motion.div>
                    <motion.div variants={linkVariants} custom={{ x: -30, delay: .55 }}>
                        <NavLink className="nav-link" to="/a-propos" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave} onClick={closeBurger}>
                            A propos
                        </NavLink>
                    </motion.div>
                    <motion.div variants={linkVariants} custom={{ x: -30, delay: .65 }}>
                        <NavLink className="nav-link" to="/contact" onMouseEnter={handleMouseEnter("link")} onMouseLeave={handleMouseLeave} onClick={closeBurger}>
                            Contact
                        </NavLink>
                    </motion.div>

                    <NavLink className="nav-link mail" to="mailto:hello@dorianlarosa.fr" onMouseEnter={handleMouseEnter('arrow-mix-blend-mode')} onMouseLeave={handleMouseLeave}>
                        <motion.div variants={linkVariants} custom={{ x: -5, delay: .95 }}>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </motion.div>
                        <motion.div variants={linkVariants} custom={{ x:0, duration: .25, x: 0, delay: .85 }}>
                            hello@dorianlarosa.fr
                        </motion.div>
                    </NavLink>
                </motion.nav>
            )}
        </header>
    );
};

export default Header;
