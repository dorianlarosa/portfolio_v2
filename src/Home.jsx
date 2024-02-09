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

const Home = () => {
  const [openAccordeonId, setOpenAccordeonId] = useState(null);
  const { handleMouseEnter, handleMouseLeave } = useCustomCursor();
  const accordeonRefs = useRef({});

  const togglePanel = (id) => {
    console.log("Current ID:", id);
    console.log("Currently Open:", openAccordeonId);
    setOpenAccordeonId(openAccordeonId === id ? null : id);
  };

  // Define parallax project
  const projectsParallax = {
    1: -2,
    2: 2,
    3: 0,
    4: -4
  };


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
            <Parallax speed={2} className="image image-1">
              <img src={imageConstruction1} alt="" />
            </Parallax>

            <Parallax speed={4} className="image image-2">
              <img src={imageConstruction2} alt="" />
            </Parallax>

            <Parallax speed={6} className="image image-3">
              <img src={imageConstruction3} alt="" />
            </Parallax>

          </div>

        </div>
      </Section >

      {/* ========== Section Réalisation ========== */}

      {/* <Section title="Réalisation" id="projects">
        <div className="list-projects">

          {projets.map((projet) => (

            <Parallax
              key={"projet" + projet.id}
              speed={projectsParallax[projet.attributes.order]}
              className={`project project-${projet.attributes.order}`}
            >

              <Link to={`projets/${projet.attributes.slug}`}
                className="link-project"
                onMouseEnter={handleMouseEnter("arrow")}
                onMouseLeave={handleMouseLeave}
              >

                <div className="container-image">
                  <img src={"http://localhost:1337" + projet.attributes.image.data.attributes.url} />
                </div>

                <h3 className="name">{projet.attributes.nom}</h3>
                <p className="tags">
                  {projet.attributes.tags.data.map((tag) => (
                    <span>
                      {tag.attributes.nom + ", "}
                    </span>
                  ))}
                </p>

              </Link>

            </Parallax>

          ))}

        </div>
      </Section> */}

      <Section title="Réalisation" id="projects">
        <div className="list-projects">

          {data.projects.map((project) => (

            <Parallax
              key={"project" + project.id}
              speed={projectsParallax[project.id]}
              className={`project project-${project.id}`}
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

            </Parallax>

          ))}

        </div>
      </Section>

      {/* ========== Section Services ========== */}

      {/* <Section title="Services" id="services-section">
        <p className="intro">Développeur <b>créatif</b> avec une formation en <b>design</b>, créant des expériences numériques immersives alliant <b>créativité</b> et <b>fonctionnalité</b>.</p>

        <div className="list-services">

          {services.map(service => (

            <div
              key={service.id}
              className={`service-item ${openAccordeonId === service.id ? 'open' : 'closed'}`}
            >

              <div className="name"
                onClick={() => togglePanel(service.id)}
                onMouseEnter={handleMouseEnter("arrow-mix-blend-mode")}
                onMouseLeave={handleMouseLeave}>

                {service.attributes.nom}

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
                  <p className="description">{service.attributes.description}</p>
                  <ListTag tags={service.attributes.tags.data}></ListTag>
                  <Button>Prendre contact</Button>
                </div>

              </div>

            </div>
          ))}

        </div>
      </Section> */}

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

      <div id="banner-home">
        <ParallaxBanner
          layers={[
            {
              image: bannerHome,
              speed: -10,
            },
          ]}
          style={{ aspectRatio: '2 / 1' }}
        />
      </div>

      {/* ========== Page Transition Overlay ========== */}

      <PageTransition />

    </>
  );
}

export default Home;