import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import NotFound from '../NotFound';
import { Link } from 'react-router-dom';

import {
  BadgeScroll, Button, PageTransition, ScrollToTop, SplitText, CustomLink
} from "../../components";

import { useCustomCursor } from '../../hooks/useCustomCursor';

import { useGsapTitleAnimation } from '../../hooks/useGsapTitleAnimation';
import "./ProjectPage.scss";
import data from './../../api/data.json';


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const ProjectPage = (props) => {
  const { handleMouseEnter, handleMouseLeave } = useCustomCursor();

  const [projectFound, setProjectFound] = useState(true);
  const [project, setProject] = useState(null);
  const [contentLoaded, setContentLoaded] = useState(false); // Nouvel état pour suivre le chargement du contenu
  const [nextProject, setNextProject] = useState(null);
  const nextProjectBackground = useRef(null);


  // Setup the animation for .letter elements with custom options
  const animationRef = useGsapTitleAnimation({
    selector: '.letter', // Default, could be omitted here
    animationOptions: {
      from: { y: 200 },
      to: { y: 0, ease: 'Power3.easeOut', duration: .8 },
      stagger: 0.03,
      delay: .7
    },
    dependencies: [contentLoaded] // Utilisez l'état contentLoaded comme dépendance
  });
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [contentLoaded]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [contentLoaded]); // S'exécute avant la première peinture

  useEffect(() => {

    const { slug } = props.params;
    const currentIndex = data.projects.findIndex(project => project.slug === slug);
    const project = data.projects[currentIndex];
    const nextProjectIndex = currentIndex + 1 === data.projects.length ? 0 : currentIndex + 1;
    const nextProject = data.projects[nextProjectIndex];
    if (project) {
      setProject(project);
      setProjectFound(true);
      setContentLoaded(true); // Mise à jour de l'état une fois le contenu chargé
      setNextProject(nextProject);

    } else {
      setProjectFound(false);
    }
  }, [props.params, data, nextProjectBackground.current]);


  useEffect(() => {
    if (nextProjectBackground.current) {
      gsap.fromTo(nextProjectBackground.current,
        {
          y: "-15%", // Commence avec un petit décalage vers le haut pour l'effet parallaxe
        },
        {
          y: "15%", // Déplace l'image vers le bas au fur et à mesure que l'utilisateur fait défiler la page
          ease: "none",
          scrollTrigger: {
            trigger: nextProjectBackground.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true, // Lie l'animation au défilement
          }
        }
      );
    }

  }, [contentLoaded, data, nextProjectBackground]);
  useEffect(() => {
    if (nextProjectBackground.current) {
      const image = nextProjectBackground.current;

      // Définissez les fonctions de rappel
      const handleMouseEnter = () => gsap.to(image, { scale: 1.05, duration: 0.5, transformOrigin: "center center" });
      const handleMouseLeave = () => gsap.to(image, { scale: 1, duration: 0.5, transformOrigin: "center center" });

      // Ajoutez les écouteurs d'événements
      image.addEventListener("mouseenter", handleMouseEnter);
      image.addEventListener("mouseleave", handleMouseLeave);

      // Retirez les écouteurs d'événements dans la fonction de nettoyage
      return () => {
        image.removeEventListener("mouseenter", handleMouseEnter);
        image.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
    // Rafraîchir ScrollTrigger après un bref délai pour le contenu dynamique
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

  }, [contentLoaded, data, nextProjectBackground.current]);

  if (!projectFound) {
    return <NotFound />;
  }

  return (
    <>

      {project ? (
        <>
          <section id="section-hero-project">
            <div className="overlay" style={{ backgroundImage: `url(${project.background})` }}></div>
            <div className="container content">
              <div className="info-project">

                <h1 ref={animationRef}>
                  <SplitText splitType="letters" str={project.name} />
                </h1>

                <div data-aos="fade" data-aos-delay={1350} >
                  <p className="description">
                    {project.description}
                  </p>
                </div>


                <CustomLink data-aos="fade" data-aos-delay={1400} to={project.url} target="_blank">Voir le site web</CustomLink>
                <div className="list-info" data-aos="fade-up" data-aos-delay={1450}>
                  <div className="info" >
                    <p className="name-info">Role</p>
                    <p className="data-info">{project.tags}</p>
                  </div>
                  <div className="info">
                    <p className="name-info">Technologies</p>
                    <p className="data-info">{project.technos}</p>
                  </div>
                  <div className="info">
                    <p className="name-info">Date</p>
                    <p className="data-info">{project.year}</p>
                  </div>
                </div>
              </div>
              {/* <div className="divider-gradient" /> */}
              <BadgeScroll delayReveal={1900}></BadgeScroll>
            </div>
          </section>
          <section id="section-list-images" className="section">
            <div className="container">
              <div className="list-images" id="list-images">
                {project.gallerie.map((image, index) => (
                  <img key={index} data-aos="fade-up" data-aos-anchor="#list-images" src={image.url} alt="" />
                ))}
              </div>
            </div>
          </section>

          {nextProject && (
            <Link id="section-next-project" onMouseEnter={handleMouseEnter("arrow-mix-blend-mode")}
              onMouseLeave={handleMouseLeave} to={`/projets/${nextProject.slug}`}>

              <div className='parallax-container'>
                <img rel="preload" ref={nextProjectBackground} src={nextProject.background} className="parallax-image" alt="Parallax Image" />

                <div className="overlay"></div>

                <div className="content-section">
                  <div className="container">
                    <p className="name">{nextProject.name}</p>
                    <p className="text">Projet suivant</p>
                  </div>
                </div>
              </div>



            </Link>
          )}
        </>
      ) : (
        <section id="section-hero-project">

        </section>
      )}
      <ScrollToTop />
      <PageTransition />
    </>
  );
};

export default ProjectPage;
