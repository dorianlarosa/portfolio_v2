import React, { useEffect, useRef, useState } from 'react';
import { PageTransition, Button, BadgeScroll, Section } from "../../components";
import image from './Dorian_LA_ROSA.png';

import "./About.scss";


import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";





/* --------- Register Plugin -------- */
gsap.registerPlugin(ScrollTrigger);


const About = () => {
  const introRef1 = useRef(null);
  const introRef2 = useRef(null);
  const introRef3 = useRef(null);



  useEffect(() => {
    // Création d'un tableau avec les références pour itération
    const refs = [introRef1, introRef2, introRef3];

    refs.forEach(ref => {
      if (!ref.current) return;

      const nodes = Array.from(ref.current.childNodes);
      nodes.forEach(node => {
        if (node.nodeType === 3) { // Noeud textuel
          const text = node.nodeValue;
          const span = document.createElement('span');
          span.innerHTML = text.split('').map(char => `<span class="char">${char}</span>`).join('');
          ref.current.replaceChild(span, node);
        }
      });

      gsap.fromTo(ref.current.querySelectorAll('.char'), {
        opacity: .2
      }, {
        opacity: 1,
        stagger: 0.02,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom-=10%',
          end: 'bottom center',
          scrub: true,
        }
      });
    });
  }, []);


  /* ---------- GSAP timeline --------- */

  // move upwards by an amount


  return (
    <div id="about">

      <section id="section-hero-about" >

        <div className="container">

          <div className="content">
            <h1>Dorian <br />LA ROSA</h1>

            <p className="intro">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero nemo voluptatum molestias sint enim ipsam soluta quia illum cupiditate ullam necessitatibur.</p>

            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis nemo libero at natus sint exercitationem totam quidem quas assumenda quos quia quis praesentium eveniet ad ex commodi, illum illo nisi.</p> */}

            <Button link="">Télécharger mon CV</Button>

            <div className="container-image">
              <img className="image" src={image} alt="" />
            </div>

          </div>


          <BadgeScroll></BadgeScroll>

        </div>

      </section>

      <Section title="Qui suis-je ?" id="about">
        <div className="row" >
          <div className="left">
            <h3>(Domaines d'expertise)</h3>
          </div>

          <div className="right list-item">

            <div className="item">
              <h4>Design Graphique et Identité Visuelle</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque consectetur delectus quae cum ab, tenetur assumenda, qui commodi ad inventore et iusto nam laboriosam! Magni debitis ullam a numquam!</p>
            </div>

            <div className="item">
              <h4>Design de Logos</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque consectetur delectus quae cum ab, tenetur assumenda, qui commodi ad inventore et iusto nam laboriosam! Magni debitis ullam a numquam!</p>
            </div>

            <div className="item">
              <h4>Design de Flyers, Brochures, et Supports Imprimés</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque consectetur delectus quae cum ab, tenetur assumenda, qui commodi ad inventore et iusto nam laboriosam! Magni debitis ullam a numquam!</p>
            </div>

            <div className="item">
              <h4>UI / UX Design, Prototypage et Wireframing</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque consectetur delectus quae cum ab, tenetur assumenda, qui commodi ad inventore et iusto nam laboriosam! Magni debitis ullam a numquam!</p>
            </div>

            <div className="item">
              <h4>Développement web front-end</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque consectetur delectus quae cum ab, tenetur assumenda, qui commodi ad inventore et iusto nam laboriosam! Magni debitis ullam a numquam!</p>
            </div>

          </div>
        </div>


        <div className="row" >
          <div className="left">
            <h3>(Ma philosophie)</h3>
          </div>

          <div className="right">

            <p className="intro" ref={introRef1}>
              Au cœur de ma démarche créative se trouve une attention particulière à l'expérience utilisateur. Je suis convaincu que la réussite d'un site web réside dans son habileté à offrir une navigation intuitive, soutenue par un design attrayant et une attention méticuleuse aux détails. Chaque projet est une opportunité de créer des expériences uniques, qui non seulement répondent aux besoins des utilisateurs mais les dépassent, tout en se démarquant dans le paysage numérique actuel.</p>
          </div>

        </div>

        <div className="row" >
          <div className="left">
            <h3>(Ma demarche)</h3>
          </div>

          <div className="right">
            <p className="intro" ref={introRef2}>
              Ma méthode de travail est fondée sur <b>l'écoute et la collaboration</b>. Je débute chaque projet par une phase de découverte approfondie, visant à comprendre vos objectifs et vos attentes. Cette compréhension me guide tout au long du processus de création, depuis la conception initiale jusqu'à la réalisation finale, en passant par des itérations basées sur vos retours. Mon objectif est de vous fournir une solution personnalisée qui transcende votre vision et favorise l'engagement de votre audience.
            </p>
          </div>

        </div>

        <div className="row" >
          <div className="left">
            <h3>(Confiance)é</h3>
          </div>

          <div className="right">

            <p className="intro" ref={introRef3}>
              Au-delà de mes compétences techniques, je m'efforce de construire des relations solides et durables avec mes clients, basées sur la confiance, la transparence et une communication fluide. Je suis convaincu que c'est en travaillant main dans la main que nous pouvons atteindre l'excellence et faire de votre projet un véritable succès.</p>
          </div>

        </div>

      </Section >

      <PageTransition />

    </div>
  );

}

export default About
