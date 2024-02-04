import React, { Component } from "react";
import "./Home.scss";

import {
  Section, BadgeScroll, Button, Tag
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
    fetch('http://localhost:1337/api/projets?fields[0]=nom&fields[1]=description&populate[0]=image&populate[1]=tags')
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        this.setState({ projets: data.data }); // Assurez-vous que cela correspond au format de votre réponse
        luge.lifecycle.refresh()

      })
      .catch(error => console.error("Erreur lors de la récupération des projets:", error));
  }

  componentWillUnmount() {
  }

  render() {

    const { projets } = this.state;

    // Define parallax project
    const projectsParallax = {
      1: .3,
      2: .5,
      3: .5,
      4: .3
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

          <div className="wrapper-scroll-info">
            <BadgeScroll></BadgeScroll>
          </div>
        </section>


        <Section title="Ma vision" id="about">


          <div className="row" >
            <div className="left">
              <p className="intro">Développeur <b>créatif</b> avec une formation en <b>design</b>, créant des expériences numériques immersives alliant <b>créativité</b> et <b>fonctionnalité</b>.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque consectetur delectus quae cum ab, tenetur assumenda, qui commodi ad inventore et iusto nam laboriosam! Magni debitis ullam a numquam!</p>
              <Button></Button>
            </div>

            <div className="right">

              <img
                className="image image-1"
                data-lg-parallax
                data-lg-parallax-amplitude="0.4"
                data-lg-parallax-inertia="1"
                data-lg-parallax-anchor="center"
                src={imageConstruction1}
                alt=""
                onLoad={this.handleImageLoaded}
              />

              <img
                className="image image-2"
                data-lg-parallax
                data-lg-parallax-amplitude="0.5"
                data-lg-parallax-anchor="center"
                data-lg-parallax-inertia="1"
                src={imageConstruction2}
                alt=""
                onLoad={this.handleImageLoaded}
              />

              <img
                className="image image-3"
                data-lg-parallax
                data-lg-parallax-amplitude="0.6"
                data-lg-parallax-anchor="center"
                data-lg-parallax-inertia="1"
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
                href="#"
                data-lg-parallax
                data-lg-parallax-amplitude={projectsParallax[projet.id]}
                data-lg-parallax-inertia="1"
                data-lg-parallax-anchor="center"
              >
                <img src={"http://localhost:1337" + projet.attributes.image.data.attributes.url} alt="" />
                <h3 className="name">{projet.attributes.nom}</h3>
                {/* <p>{projet.attributes.description}</p> */}
                <ul className="list-tag">
                  {projet.attributes.tags.data.map((tag) => (
                    <li key={projet.id + "-" + tag.id}>
                      <Tag title={tag.attributes.nom}></Tag>
                    </li>
                  ))}
                </ul>
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
