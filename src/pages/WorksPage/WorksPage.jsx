import React, { useEffect, useRef } from 'react';

import "./WorksPage.scss";
import { Link } from 'react-router-dom';

import { PageTransition } from "../../components";
import { useCustomCursor } from '../../hooks/useCustomCursor';
import { useGsapTitleAnimation } from '../../hooks/useGsapTitleAnimation';

import data from '../../api/data.json';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);




const WorksPage = () => {
    const sectionRef = useRef(null);


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, Draggable);
        const section = sectionRef.current;
        const content = section.querySelector('.scroll-content');
        const horizontalScrollLength = content.scrollWidth - section.offsetWidth;


        // Configuration du ScrollTrigger pour le défilement horizontal
        const scrollTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => "+=" + horizontalScrollLength,
            pin: true,
            scrub: true,
            onUpdate: self => {
                // Mise à jour de la position du contenu en fonction du progrès du ScrollTrigger
                gsap.set(content, { x: -self.progress * horizontalScrollLength });
            },
        });

        // Initialisation de Draggable pour le glissement horizontal avec l'effet d'inertie
        const draggable = Draggable.create(content, {
            type: "x",
            bounds: { minX: -horizontalScrollLength, maxX: 0 },
            inertia: true,
            throwProps: true,

            throwResistance: 3000, // Ajustez cette valeur pour contrôler la durée de l'inertie

            onDrag: function () {
                // Mise à jour de ScrollTrigger en fonction de la position de Draggable
                const progress = -this.x / horizontalScrollLength;
                scrollTrigger.scroll(scrollTrigger.start + progress * scrollTrigger.end);
            },
            onDragEnd: function () {
                console.log("Drag Ended");
            },
            onThrowUpdate: function () {
                const progress = this.x / -horizontalScrollLength;
                ScrollTrigger.getAll().forEach(trigger => {
                    if (trigger.vars.trigger === section) {
                        trigger.scroll(progress * trigger.end);
                        trigger.update();
                    }
                });
            }
        })[0]; // Utilisation du premier élément retourné par Draggable.create

        // Gestion des animations basées sur la vitesse du défilement
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
            const scrollSpeed = Math.abs(scrollTop - lastScrollTop);
            const skewAmount = scrollDirection * Math.min(20, scrollSpeed * 0.2);
            const scaleAmount = Math.max(0.9, 1 - (scrollSpeed * 0.001));

            gsap.to('.js-transition-img', {
                skewX: skewAmount,
                scale: scaleAmount,
                duration: 0.5,
                ease: 'none',
            });

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        }, { passive: true });

        // Nettoyage à la désinscription du composant
        return () => {
            scrollTrigger.kill();
            draggable.kill();
        };
    }, []);
    return (
        <>
            <section id="section-slide-works" ref={sectionRef}>
                <div className="scroll-content" data-scroll-content>
                    {data.projects.map((project, index) => (

                        <article key={index} className={`slide slide--${index + 1} js-slide`}>
                            <Link to={`/projets/${project.slug}`}>

                                <div className="slide__inner">

                                    <div className="slide__img js-transition-img">
                                        <figure className="js-transition-img__inner">
                                            <img src={project.thumbnail} alt={project.name} draggable="false" />
                                        </figure>
                                    </div>
                                    <div className="slide__sub-title"><span>Project</span></div>
                                    <h1 className="slide__title">
                                        <div className="js-transition-title">{project.name}</div>
                                    </h1>

                                </div>
                            </Link>

                        </article>

                    ))}
                </div>

                <div className="scrollbar" data-scrollbar>
                    <div className="scrollbar__handle js-scrollbar__handle"></div>
                </div>
            </section>

            <PageTransition />
        </>
    );
};

export default WorksPage;
