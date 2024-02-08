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

const Home = () => {
  const [projets, setProjets] = useState([]);
  const [services, setServices] = useState([]);
  const [openAccordeonId, setOpenAccordeonId] = useState(null);
  const { handleMouseEnter, handleMouseLeave } = useCustomCursor();
  const accordeonRefs = useRef({});


  useEffect(() => {
    // Fonctions pour fetch les projets et les services
    const fetchProjets = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/projets?fields[0]=nom&fields[1]=description&fields[2]=slug&populate[0]=image&populate[1]=tags');
        const data = await response.json();
        setProjets(data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/services?fields[0]=nom&fields[1]=description&fields&populate[0]=tags');
        const data = await response.json();
        setServices(data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des services:", error);
      }
    };

    fetchProjets();
    fetchServices();
  }, []);

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
      <section id="section-hero">
        <h1>
          <span className="name">
            Dorian LA ROSA
          </span>
          <span>
            Développeur
          </span>
          <span>
            Front-End
          </span>
        </h1>

        <div className="divider-gradient" />
        <BadgeScroll></BadgeScroll>

      </section>


      <Section title="Ma vision" id="about">


        <div className="row" >
          <div className="left">
            <p className="intro">Développeur <b>créatif</b> avec une formation en <b>design</b>, créant des expériences numériques immersives alliant <b>créativité</b> et <b>fonctionnalité</b>.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque consectetur delectus quae cum ab, tenetur assumenda, qui commodi ad inventore et iusto nam laboriosam! Magni debitis ullam a numquam!</p>
            <Button>Qui suis-je ?</Button>
          </div>

          <div className="right">
            <Parallax speed={2} className="image image-1">

              <img
                src={imageConstruction1}
                alt=""
              />

            </Parallax>

            <Parallax speed={4} className="image image-2">
              <img
                src={imageConstruction2}
                alt=""
              />
            </Parallax>

            <Parallax speed={6} className="image image-3">
              <img
                src={imageConstruction3}
                alt=""
              />
            </Parallax>

          </div>
        </div>


      </Section >

      {/* <Section title="Réalisation" id="projects">

          <div className="list-projects">
            {projets.map((projet) => (
              <Parallax key={"projet" + projet.id} speed={projectsParallax[projet.id]} className={`project project-${projet.id}`}>
                <Link to={`projets/${projet.attributes.slug}`} className="link-project" >
                  <WaveEffectImage imageUrl={"http://localhost:1337" + projet.attributes.image.data.attributes.url} />
                  <h3 className="name">{projet.attributes.nom}</h3>

                </Link>
              </Parallax>

            ))}
          </div>

        </Section> */}

      <Section title="Réalisation" id="projects">

        <div className="list-projects">
          {projets.map((projet) => (
            <Parallax key={"projet" + projet.id} speed={projectsParallax[projet.id]} className={`project project-${projet.id}`}>
              <Link to={`projets/${projet.attributes.slug}`} className="link-project" onMouseEnter={handleMouseEnter("arrow")} onMouseLeave={handleMouseLeave} >
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

      </Section>

      <Section title="Services" id="services-section">
        <div className="list-services">
          {services.map(service => (
            <div key={service.id} className="service-item">
              <div className="name"
                onClick={() => togglePanel(service.id)}
                onMouseEnter={handleMouseEnter("arrow-mix-blend-mode")}
                onMouseLeave={handleMouseLeave}>
                {service.attributes.nom}
                {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-plus"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>}
              </div>
              <div className={`panel ${openAccordeonId === service.id ? 'open' : 'closed'}`}
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
      </Section>
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

      <PageTransition />

    </>
  );
}

export default Home;