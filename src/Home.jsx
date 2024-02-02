import React, { Component } from "react";
import "./Home.scss";

import {
  Section, SvgFlower
} from "./components";

class Home extends Component {

  render() {

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
            <SvgFlower></SvgFlower>
          </div>
        </section>


        <Section title="Ma vision" id="about">
          <p>Contenu de la section À propos de moi...</p>
        </Section>

        <Section title="Réalisation" id="projects">
          <p>Contenu de la section Projets...</p>
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
