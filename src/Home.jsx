import React, { useState, useRef, useEffect, memo } from 'react';

import "./Home.scss";
import { Link } from 'react-router-dom';

import { Section, BadgeScroll, Button, ListTag, PageTransition, SplitText, BannerImage } from "./components";
import { useCustomCursor } from './hooks/useCustomCursor';
import { useGsapTitleAnimation } from './hooks/useGsapTitleAnimation';


import imageConstruction1 from './assets/images/construction-1.jpeg';
import imageConstruction2 from './assets/images/construction-2.jpeg';
import imageConstruction3 from './assets/images/construction-3.jpeg';

import data from './api/data.json';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


const Home = () => {
  const [openAccordeonId, setOpenAccordeonId] = useState(0);
  const { handleMouseEnter, handleMouseLeave } = useCustomCursor();
  const accordeonRefs = useRef({});
  const refImage1 = useRef(null);
  const refImage2 = useRef(null);

  const refImage3 = useRef(null);
  const projectRefs = useRef({});

  const textAnimationRef = useRef(null); // Référence pour le conteneur de SplitText


  const parallaxConfig = {
    1: 0, // ID du projet: intensité du parallaxe
    2: 17,
    3: 22,
    4: 5
  };

  // Setup the animation for .letter elements with custom options
  const animationRef = useGsapTitleAnimation({
    selector: '.letter', // Default, could be omitted here
    animationOptions: {
      from: { y: 200, autoAlpha: 0 },
      to: { y: 0, autoAlpha: 1, ease: 'Power3.easeOut', duration: .8 },
      stagger: 0.03,
      delay: .85
    },
    dependencies: [] // Dependencies if the animation needs to react to changes
  });

  const togglePanel = (id) => {
    console.log("Current ID:", id);
    console.log("Currently Open:", openAccordeonId);
    setOpenAccordeonId(openAccordeonId === id ? null : id);
  };


  useEffect(() => {
    ScrollTrigger.refresh();

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


  }, [data]);


  return (
    <div id="home">

      {/* ========== Section Hero ========== */}
      <section id="section-hero">
        <div className="container">

          <div className="content">

            <h1 ref={animationRef}>
              <span className="line name" data-aos="fade" data-aos-delay={700}>
                Dorian LA ROSA
              </span>
              <span className='line'>
                <SplitText splitType="letters" str={"Développeur Web"} />


              </span>
              <span className='line'>
                <SplitText splitType="letters" str={"& Web Designer"} />
              </span>
            </h1>
            {/* <p className="intro" data-aos="fade"
              data-aos-delay="2100"

            >Développeur <b>créatif</b> avec une formation en <b>design</b>, créant des sites web immersifs alliant <b>créativité</b> et <b>fonctionnalité</b>.
            
            </p> */}

            <p className="intro" data-aos="fade"
              data-aos-delay="2100"
            >
              <b>Création</b> de <b>sites web</b> <b>sur-mesure</b>, je vous accompagne à chaque étape de votre projet. Depuis l'élaboration de votre <b>identité digitale</b> jusqu'à la <b>conception</b> de votre <b>site web</b>,            </p>
          </div>

          <div className="divider-gradient" />

          <BadgeScroll delayReveal={2250}></BadgeScroll>

        </div>
      </section>

      {/* ========== Section Ma Vision ========== */}

      <Section title="Ma vision" id="about">
        <div className="row" >

          <div className="left">
            <p className="intro">Je suis un créateur de <b>solutions digitales</b>, dédié à transformer chaque <b>site web</b> en une <b>expérience unique</b> et <b>mémorable</b>.</p>
            <p>
              Mon engagement se caractérise par une écoute attentive et un souci du détail sans faille, essentiels pour comprendre et répondre à vos besoins spécifiques ainsi qu'à vos enjeux stratégiques.
            </p>

            <Button to={"a-propos"}>Qui suis-je ?</Button>
          </div>

          <div className="right" id="container-images-about">
            <div ref={refImage1} className='image image-1'>
              <img rel="preload" src={imageConstruction1} data-aos-anchor="#container-images-about" data-aos="fade" alt="" />

            </div>
            <div ref={refImage2} className='image image-2'>
              <img rel="preload" src={imageConstruction2} data-aos-anchor="#container-images-about" data-aos="fade" data-aos-delay="100" alt="" />
            </div>
            <div ref={refImage3} className='image image-3'>
              <img rel="preload" src={imageConstruction3} data-aos-anchor="#container-images-about" data-aos="fade" data-aos-delay="200" alt="" />
            </div>
          </div>

        </div>
      </Section >

      {/* ========== Section Réalisation ========== */}

      <Section title="Réalisation" id="projects">
        <div className="list-projects" id="list-projects">

          {data.projects.map((project, index) => (



            <div key={"project" + project.id}
              className={`project project-${project.id}`}
              ref={el => projectRefs.current[project.id] = { current: el }}

            >
              <div data-aos-anchor="#list-projects" data-aos="fade-up" data-aos-delay={`${150 * index - 150}`}>


                <Link to={`projets/${project.slug}`}
                  className="link-project"
                  onMouseEnter={handleMouseEnter("arrow")}
                  onMouseLeave={handleMouseLeave}
                >

                  <div className="container-image">
                    <img rel="preload" src={project.thumbnail} />
                  </div>

                  <h3 className="name">{project.name}</h3>
                  <p className="tags">
                    {project.tags}
                  </p>

                </Link>
              </div>

            </div>



          ))}

        </div>
      </Section >

      {/* ========== Section Services ========== */}

      <Section title="Services" id="services-section">

        <div className="row">
          <div className="left">
            <p className="intro">
              Je vous accompagne à chaque étape de votre <b>projet digital</b>, d'une simple <b>idée</b> en passant par la <b>matérialisation de votre vision</b> jusqu'à la <b>réalisation finale</b> de votre projet.
            </p>
          </div>
         

        </div>


        <div className="list-services" id="list-services">

          {data.services.map((service, index) => (
            <div className="container-service-item" data-aos-anchor="#list-services" data-aos="fade-up" data-aos-delay={`${150 * index}`}>

              <div
                key={index}
                className={`service-item ${openAccordeonId === index ? 'open' : 'closed'}`}

              >

                <div className="name"
                  onClick={() => togglePanel(index)}
                  onMouseEnter={handleMouseEnter("arrow-mix-blend-mode")}
                  onMouseLeave={handleMouseLeave}>

                  {service.nom}

                  <div className='icon'>
                    <span></span>
                    <span></span>
                  </div>

                </div>

                <div className="panel"
                  ref={el => accordeonRefs.current[index] = el}
                  style={{
                    maxHeight: openAccordeonId === index ? `${accordeonRefs.current[index]?.scrollHeight}px` : "0"
                  }}
                >
                  <div className="content-panel">
                    <p className="description">{service.description}</p>
                    <ListTag tags={service.tags}></ListTag>
                    <Button>Prendre contact</Button>
                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>

      </Section>



      {/* ========== Banner Image ========== */}

      <BannerImage />

      {/* ========== Page Transition Overlay ========== */}
      <PageTransition />


    </div>
  );
}

export default Home;