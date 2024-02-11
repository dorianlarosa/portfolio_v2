import React, { useState, useRef, useEffect } from 'react';

import "./Home.scss";
import { ParallaxBanner, Parallax } from 'react-scroll-parallax';
import { Link } from 'react-router-dom';

import { Section, BadgeScroll, Button, ListTag, PageTransition } from "./components";
import { useCustomCursor } from './hooks/useCustomCursor';

import imageConstruction1 from './assets/images/construction-1.jpg';
import imageConstruction2 from './assets/images/construction-2.jpg';
import imageConstruction3 from './assets/images/construction-3.jpg';
import bannerHome from './assets/images/banner-home.jpg';

import data from './api/data.json';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const Home = () => {
  const [openAccordeonId, setOpenAccordeonId] = useState(null);
  const { handleMouseEnter, handleMouseLeave } = useCustomCursor();
  const accordeonRefs = useRef({});
  const refImage1 = useRef(null);
  const refImage2 = useRef(null);
  const refBannerImage = useRef(null);

  const refImage3 = useRef(null);
  const projectRefs = useRef({});

  const parallaxConfig = {
    1: 0, // ID du projet: intensité du parallaxe
    2: 17,
    3: 22,
    4: 5
  };

  const togglePanel = (id) => {
    console.log("Current ID:", id);
    console.log("Currently Open:", openAccordeonId);
    setOpenAccordeonId(openAccordeonId === id ? null : id);
  };

  useEffect(() => {
    gsap.fromTo(refImage1.current,
      { y: '5%' },
      {
        y: '-5%',
        ease: "none",
        scrollTrigger: {
          trigger: refImage1.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    gsap.fromTo(refImage2.current,
      { y: '10%' },
      {
        y: '-10%',
        ease: "none",
        scrollTrigger: {
          trigger: refImage2.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    gsap.fromTo(refImage3.current,
      { y: '15%' },
      {
        y: '-15%',
        ease: "none",
        scrollTrigger: {
          trigger: refImage3.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    data.projects.forEach(project => {
      const ref = projectRefs.current[project.id].current;
      const parallaxIntensity = parallaxConfig[project.id] || 0; // Utilisez une valeur par défaut si non spécifiée

      if (ref) {
        gsap.fromTo(ref,
          { y: `${parallaxIntensity}%` },
          {
            y: `-${parallaxIntensity}%`, // Intensité de parallaxe basée sur la configuration
            ease: "none",
            scrollTrigger: {
              trigger: ref,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }
    });

    gsap.fromTo(refBannerImage.current,
      {
        y: "-15%", // Commence avec un petit décalage vers le haut pour l'effet parallaxe
      },
      {
        y: "15%", // Déplace l'image vers le bas au fur et à mesure que l'utilisateur fait défiler la page
        ease: "none",
        scrollTrigger: {
          trigger: refBannerImage.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true, // Lie l'animation au défilement
        }
      }
    );
  }, []);


  return (
    <>

      {/* ========== Section Hero ========== */}
      <section id="section-hero">
        <div className="container">

          <div className="content">

            <h1>
              <span className="name">
                Dorian LA ROSA
              </span>
              <span>
                Développeur Web
              </span>
              <span>
                & Web Designer
              </span>
            </h1>
            <p className="intro">Développeur <b>créatif</b> avec une formation en <b>design</b>, créant des expériences numériques immersives alliant <b>créativité</b> et <b>fonctionnalité</b>.</p>

          </div>

          <div className="divider-gradient" />
          <BadgeScroll></BadgeScroll>

        </div>
      </section>

      {/* ========== Section Ma Vision ========== */}

      <Section title="Ma vision" id="about">
        <div className="row" >

          <div className="left">
            <p className="intro">Développeur <b>créatif</b> avec une formation en <b>design</b>, créant des expériences numériques immersives alliant <b>créativité</b> et <b>fonctionnalité</b>.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque consectetur delectus quae cum ab, tenetur assumenda, qui commodi ad inventore et iusto nam laboriosam! Magni debitis ullam a numquam!</p>
            <Button>Qui suis-je ?</Button>
          </div>

          <div className="right">
            <img src={imageConstruction1} ref={refImage1} className='image image-1' alt="" />

            <img src={imageConstruction2} ref={refImage2} className='image image-2' alt="" />

            <img src={imageConstruction3} ref={refImage3} className='image image-3' alt="" />

          </div>

        </div>
      </Section >

      {/* ========== Section Réalisation ========== */}

      <Section title="Réalisation" id="projects">
        <div className="list-projects">

          {data.projects.map((project) => (


            <div key={"project" + project.id}
              className={`project project-${project.id}`}
              ref={el => projectRefs.current[project.id] = { current: el }}
            >

              <Link to={`projets/${project.slug}`}
                className="link-project"
                onMouseEnter={handleMouseEnter("arrow")}
                onMouseLeave={handleMouseLeave}
              >

                <div className="container-image">
                  <img src={project.thumbnail} />
                </div>

                <h3 className="name">{project.name}</h3>
                <p className="tags">
                  {project.tags}
                </p>

              </Link>
            </div>



          ))}

        </div>
      </Section >

      {/* ========== Section Services ========== */}

      <Section title="Services" id="services-section">
        <p className="intro">Développeur <b>créatif</b> avec une formation en <b>design</b>, créant des expériences numériques immersives alliant <b>créativité</b> et <b>fonctionnalité</b>.</p>

        <div className="list-services">

          {data.services.map(service => (

            <div
              key={service.id}
              className={`service-item ${openAccordeonId === service.id ? 'open' : 'closed'}`}
            >

              <div className="name"
                onClick={() => togglePanel(service.id)}
                onMouseEnter={handleMouseEnter("arrow-mix-blend-mode")}
                onMouseLeave={handleMouseLeave}>

                {service.name}

                <div className='icon'>
                  <span></span>
                  <span></span>
                </div>

              </div>

              <div className="panel"
                ref={el => accordeonRefs.current[service.id] = el}
                style={{
                  maxHeight: openAccordeonId === service.id ? `${accordeonRefs.current[service.id]?.scrollHeight}px` : "0"
                }}
              >
                <div className="content-panel">
                  <p className="description">{service.description}</p>
                  <ListTag tags={service.tags}></ListTag>
                  <Button>Prendre contact</Button>
                </div>

              </div>

            </div>
          ))}

        </div>
      </Section>



      {/* ========== Banner Image ========== */}

      <div id="banner-home" >
        <div className='parallax-container'>
          <img ref={refBannerImage} src={bannerHome} className="parallax-image" alt="Parallax Image" />
        </div>
      </div>

      {/* ========== Page Transition Overlay ========== */}
      <PageTransition />


    </>
  );
}

export default Home;