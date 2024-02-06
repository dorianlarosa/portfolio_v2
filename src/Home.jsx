import React, { Component } from "react";
import "./Home.scss";
import { ParallaxBanner, Parallax } from 'react-scroll-parallax';

// Assurez-vous que les composants suivants sont correctement importés.
import { Section, BadgeScroll, Button, ListTag, WaveEffectImage, Blob, BlobWithBackground } from "./components";

import imageConstruction1 from './assets/images/construction-1.jpg';
import imageConstruction2 from './assets/images/construction-2.jpg';
import imageConstruction3 from './assets/images/construction-3.jpg';
import bannerHome from './assets/images/banner-home.jpg';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projets: [],
      services: [],
      openAccordeonId: null,
    };

    // Initialiser un objet vide pour stocker les refs des panels de services.
    this.accordeonRefs = {};
  }

  componentDidMount() {
    this.fetchProjets();
    this.fetchServices();
  }


  fetchProjets = () => {
    fetch('http://localhost:1337/api/projets?fields[0]=nom&fields[1]=description&fields[2]=slug&populate[0]=image&populate[1]=tags')
      .then(response => response.json())
      .then(data => {
        this.setState({ projets: data.data }); // Assurez-vous que cela correspond au format de votre réponse

      })
      .catch(error => console.error("Erreur lors de la récupération des projets:", error));
  }

  fetchServices = () => {
    fetch('http://localhost:1337/api/services?fields[0]=nom&fields[1]=description&fields&populate[0]=tags')
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        this.setState({ services: data.data }); // Assurez-vous que cela correspond au format de votre réponse

      })
      .catch(error => console.error("Erreur lors de la récupération des services:", error));
  }

  togglePanel = (id) => {
    this.setState(prevState => ({
      openAccordeonId: prevState.openAccordeonId === id ? null : id
    }));
  }



  render() {
    const { projets, services, openAccordeonId } = this.state;

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
          {/* <Blob/> */}
          <BlobWithBackground/>
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


          <BadgeScroll></BadgeScroll>

          {/* <div className="divider-gradient"/> */}

        

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
                  onLoad={this.handleImageLoaded}
                />
              </Parallax>

              <Parallax speed={4} className="image image-2">
                <img
                  src={imageConstruction2}
                  alt=""
                  onLoad={this.handleImageLoaded}
                />
              </Parallax>

              <Parallax speed={6} className="image image-3">
                <img
                  src={imageConstruction3}
                  alt=""
                  onLoad={this.handleImageLoaded}
                />
              </Parallax>

            </div>
          </div>


        </Section >

        <Section title="Réalisation" id="projects">

          <div className="list-projects">
            {projets.map((projet) => (
              <Parallax key={"projet" + projet.id} speed={projectsParallax[projet.id]} className={`project project-${projet.id}`}>
                <a
                  className="link-project"
                  href={`projets/${projet.attributes.slug}`}
                >

                  <WaveEffectImage imageUrl={"http://localhost:1337" + projet.attributes.image.data.attributes.url} />
                  <h3 className="name">{projet.attributes.nom}</h3>
                  {/* <ListTag tags={projet.attributes.tags.data}></ListTag> */}
                  {/* <p>{projet.attributes.description}</p> */}



                </a>
              </Parallax>

            ))}
          </div>

        </Section>

        <Section title="Services" id="services-section">
        <p className="intro">Lorem ipsum dolor sit amet consectetur adipisicing elit. A quod minima consequatur, perspiciatis sequi minus inventore fuga voluptatem impedit error fugiat debitis, itaque eos nisi quia quam rem, nam aliquid!
        Tempore at dolor fugit quisquam debitis sit saepe modi labore, laborum officiis commodi similique, tenetur enim inventore deserunt numquam, voluptatem itaque. Non animi fuga ducimus velit, consequuntur impedit vel alias.</p>

          <div className="list-services">
            {services.map((service, index) => (
              <div key={service.id} className="service-item">
                <div className="name" onClick={() => this.togglePanel(service.id)}>

                  {service.attributes.nom}

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
                  </svg>
                </div>
                <div
                  ref={el => this.accordeonRefs[service.id] = el} // Assignation de la ref
                  className={`panel ${openAccordeonId === service.id ? 'open' : 'closed'}`}
                  style={{
                    maxHeight: openAccordeonId === service.id ? `${this.accordeonRefs[service.id]?.scrollHeight}px` : "0"
                  }}>
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

        <ParallaxBanner
          id="banner-home"
          layers={[
            {
              image: bannerHome,
              speed: -10,
            },
          ]}
          style={{ aspectRatio: '2 / 1' }}
        />
      </>
    );
  }
}

export default Home
