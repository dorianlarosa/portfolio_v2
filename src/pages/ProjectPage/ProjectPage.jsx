import React, { Component } from "react";
import NotFound from '../NotFound';

import {
  BadgeScroll, Button, ListTag, PageTransition, ScrollToTop
} from "../../components";

import "./ProjectPage.scss";

import data from './../../api/data.json';



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

    // Recherche du projet en fonction du slug
    const project = data.projects.find(project => project.slug === slug);

    // Mettre à jour l'état avec le résultat de la recherche
    this.setState({ projectFound: !!project, project });

    console.log(project);
  }

  render() {
    const { projectFound, project } = this.state;

    if (!projectFound) {
      return <NotFound />;
    }

    // Affichez le projet si trouvé
    return (
      <>
        <ScrollToTop />

        {project ? (
          <>

            {/* ========== Section Hero ========== */}

            <section id="section-hero-project" >

              <div className="overlay" style={{ backgroundImage: `url(${project.thumbnail})` }}>

              </div>


              <div className="container content">

                <div className="info-project">
                  <h1>{project.name}</h1>
                  <p className="description">{project.description}</p>
                  <Button link={project.url}>Voir le site web</Button>


                  <div className="list-info">

                    <div className="info">
                      <p className="name-info">Role</p>
                      <p className="data-info">

                        {project.tags}
                      </p>
                    </div>
                    <div className="info">
                      <p className="name-info">Technologies</p>
                      <p className="data-info">{project.technos}</p>
                    </div>

                    <div className="info">
                      <p className="name-info">Date</p>
                      <p className="data-info">{project.year}</p>
                    </div>


                  </div>




                </div>
                <div className="divider-gradient" />

                <BadgeScroll></BadgeScroll>

              </div>

            </section>

            {/* ========== Section list images ========== */}

            <section id="section-list-images" className="section ">

              <div className="container">
                <div className="list-images">

                  {project.gallerie.map((image) => (
                    <img src={image.url} alt="" />
                  ))}
                </div>
              </div>

            </section>
          </>
        ) : (
          <div>Chargement...</div>
        )
        }
        <PageTransition />

      </>
    );
  }
}

export default ProjectPage;