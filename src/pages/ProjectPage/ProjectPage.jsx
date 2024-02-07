import React, { Component } from "react";
import NotFound from '../NotFound';

import {
  BadgeScroll, Button, ListTag, PageTransition, ScrollToTop
} from "../../components";

import "./ProjectPage.scss";


class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectFound: true,
      project: null,
    };
  }

  componentDidMount() {

    const { slug } = this.props.params;


    // Imaginons que vous fassiez une requête à une API pour récupérer le projet
    fetch(`http://localhost:1337/api/projets?filters%5Bslug%5D%5B%24eq%5D=${slug}&populate[0]=image&populate[1]=tags&populate[2]=gallerie`)
      .then(response => response.json())
      .then(data => {
        if (data.data.length > 0) {
          this.setState({ project: data.data[0].attributes, projectFound: true });
        } else {
          this.setState({ projectFound: false });
        }
      })
      .catch(error => {
        console.error('Erreur de fetch:', error);
        this.setState({ projectFound: false });
      });
  }

  render() {
    const { projectFound, project } = this.state;

    if (!projectFound) {
      // Affichez le contenu "Not Found" sans changer l'URL
      return <NotFound />;
    }

    // Affichez le projet si trouvé
    return (
      <>
      <ScrollToTop />
        {project ? (
          <>
            <section id="section-hero-project" className="container">
              <div className="left">
                <h1>{project.nom}</h1>
                <ListTag tags={project.tags.data}></ListTag>
                <p>{project.description}</p>
                <Button link={project.url}>Voir le site web</Button>
              </div>


              <div className="right">
                <img src={"http://localhost:1337" + project.image.data.attributes.url} alt="" />
              </div>

              <BadgeScroll></BadgeScroll>
            </section>

            <section id="list-images" className="section container">

              {project.gallerie.data.map((image) => (
                <img key={image.id} src={"http://localhost:1337" + image.attributes.url} alt="" />
              ))}
            </section>
          </>
        ) : (
          <div>Chargement...</div>
        )}
        <PageTransition />

      </>
    );
  }
}

export default ProjectPage;