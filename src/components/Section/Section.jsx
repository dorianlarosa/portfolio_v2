import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import "./Section.scss";

import {
    SvgFlower
} from "..";

const Section = ({ title, children, id}) => {
    const titleRef = useRef(null); // Création de la référence
    const flowerRef = useRef(null); // Nouvelle référence pour la fleur


    useEffect(() => {
        if (titleRef.current) {
            gsap.set(titleRef.current, {force3D: true});
            gsap.fromTo(titleRef.current,
                { x: "25vw" }, // Position de départ à 400px à droite
                {
                    x: "-25vw", // Position de fin à -400px à gauche
                    ease: "none",
                    scrollTrigger: {
                        trigger: titleRef.current, // Utilisez la section entière comme déclencheur
                        start: "top bottom", // Animation commence quand le haut de la section atteint le bas du viewport
                        end: "bottom top", // Animation finit quand le bas de la section quitte le haut du viewport
                        scrub: true, // Lie l'animation au scroll
                        fastScrollEndDuration: 1,
                    }
                }
            );

             // Animation pour la fleur
             gsap.fromTo(flowerRef.current,
                { rotation: 0 }, // Départ rotation à 0 degrés
                {
                    rotation: 90, // Fin rotation à 360 degrés (un tour complet)
                    ease: "none",
                    scrollTrigger: {
                        trigger: flowerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                        fastScrollEndDuration: 1,
                    }
                }
            );
        }
    }, []);




    return (
        <section id={id} className="section">
            <div className="container">
                <div className="wrapper-flower">

                    <SvgFlower ref={flowerRef}></SvgFlower>

                </div>

                <div className="wrapper-h2">

                <h2 ref={titleRef} data-text={title} className="my-element">
                        <span aria-hidden="true" className="text-grey">{title}</span>

                        <span aria-hidden="true" className="text-grey">{title}</span>

                        <span>{title}</span>
                        <span aria-hidden="true" className="text-grey">{title}</span>

                        <span aria-hidden="true" className="text-grey">{title}</span>
                    </h2>


                </div>

                <div className="content-section">
                    {children}
                </div>
            </div>
        </section>
    );

}

export default Section
