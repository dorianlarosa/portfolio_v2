import React, { Component } from "react";
import "./Home.scss";

import {
  Section, SvgFlower, BadgeScroll
} from "./components";

import imageConstruction1 from './assets/images/construction-1.jpg';
import imageConstruction2 from './assets/images/construction-2.jpg';
import imageConstruction3 from './assets/images/construction-3.jpg';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      containerImagesHeight: 0,
    };
    this.containerImagesRef = React.createRef(); // Créer une référence pour le conteneur des images
  }

  // Définir la hauteur du container images après le chargement des images
  handleImageLoaded = () => {
    this.updatecontainerImagesHeight();
  };

  updatecontainerImagesHeight = () => {
    const containerImages = this.containerImagesRef.current;
    if (containerImages) {
      let maxHeight = 0;

      // Obtenir tous les éléments enfants avec la classe image
      Array.from(containerImages.getElementsByClassName('image')).forEach(img => {
        const imgBottom = img.offsetTop + img.offsetHeight;
        if (imgBottom > maxHeight) {
          maxHeight = imgBottom;
        }
      });

      // Mettre à jour la valeur du parent par rapport à la taille des 3 images
      this.setState({ containerImagesHeight: maxHeight });

    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.updatecontainerImagesHeight);
  }

  componentWillUnmount() {
    // Nettoyer l'écouteur lors du démontage
    window.removeEventListener('resize', this.updatecontainerImagesHeight);
  }

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
            <BadgeScroll></BadgeScroll>
          </div>
        </section>


        <Section title="Ma vision" id="about">


          <div className="row" >
            <div className="left">
              <p className="intro">Développeur <b>créatif</b> avec une formation en <b>design</b>, créant des expériences numériques immersives alliant <b>créativité</b> et <b>fonctionnalité</b>.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque consectetur delectus quae cum ab, tenetur assumenda, qui commodi ad inventore et iusto nam laboriosam! Magni debitis ullam a numquam!</p>
            </div>

            <div className="right" ref={this.containerImagesRef} style={{ height: this.state.containerImagesHeight }}>

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
