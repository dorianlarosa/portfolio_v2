import React, { Component } from "react";
import "./Home.scss";

import {
  Section, BadgeScroll, Button, ListTag, WaveEffectImage
} from "./components";



import imageConstruction1 from './assets/images/construction-1.jpg';
import imageConstruction2 from './assets/images/construction-2.jpg';
import imageConstruction3 from './assets/images/construction-3.jpg';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projets: []
    };
  }

  componentDidMount() {

    // Get projects
    this.fetchProjets();
    
  }


  fetchProjets = () => {
    fetch('http://localhost:1337/api/projets?fields[0]=nom&fields[1]=description&fields[2]=slug&populate[0]=image&populate[1]=tags')
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        this.setState({ projets: data.data }); // Assurez-vous que cela correspond au format de votre réponse
      
      })
      .catch(error => console.error("Erreur lors de la récupération des projets:", error));
  }

  componentWillUnmount() {

  }

  render() {

    const { projets } = this.state;

    // Define parallax project
    const projectsParallax = {
      1: .1,
      2: .3,
      3: .4,
      4: .2
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
              <img
                className="image image-1"
                data-scroll data-scroll-speed="0.1"
                src={imageConstruction1}
                alt=""
                onLoad={this.handleImageLoaded}
              />

              <img
                className="image image-2"
                data-scroll data-scroll-speed="0.12"
                src={imageConstruction2}
                alt=""
                onLoad={this.handleImageLoaded}
              />

              <img
                className="image image-3"
                data-scroll data-scroll-speed="0.14"
                src={imageConstruction3}
                alt=""
                onLoad={this.handleImageLoaded}
              />
            </div>
          </div>


        </Section>

        <Section title="Réalisation" id="projects">

          <div className="list-projects">
            {projets.map((projet) => (

              <a
                className={`project project-${projet.id}`}
                key={projet.id}
                href={`projets/${projet.attributes.slug}`}
                data-scroll
                data-scroll-speed={projectsParallax[projet.id]}
              >

                <WaveEffectImage imageUrl={"http://localhost:1337" + projet.attributes.image.data.attributes.url} />
                <h3 className="name">{projet.attributes.nom}</h3>
                {/* <p>{projet.attributes.description}</p> */}

                <ListTag tags={projet.attributes.tags.data}></ListTag>


              </a>
            ))}
          </div>

        </Section>

        <Section title="Services" id="projects">
          <p>Contenu de la section Projets...</p>
        </Section>

        <Section title="Me contacter" id="projects">
          <p>Contenu de la section Projets...</p>
        </Section>
      </>
    );
  }
}

export default Home
