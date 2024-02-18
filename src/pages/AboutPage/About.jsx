import React, { useEffect, useRef, useState } from 'react';
import { PageTransition, Button, BadgeScroll, Section, SvgFlower, SplitText, } from "../../components";
import image from './Dorian_LA_ROSA.png';

import "./About.scss";

import { useGsapTitleAnimation } from '../../hooks/useGsapTitleAnimation';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


// import { SplitText } from "@cyriacbr/react-split-text";


/* --------- Register Plugin -------- */
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const introRef1 = useRef(null);
  const introRef2 = useRef(null);
  const introRef3 = useRef(null);
  const textAnimationRef = useRef(null); // Référence pour le conteneur de SplitText

  const animationRef = useGsapTitleAnimation({
    selector: '.letter', // Default, could be omitted here
    animationOptions: {
      from: { y: 200 },
      to: { y: 0, ease: 'Power3.easeOut', duration: .8 },
      stagger: 0.03,
      delay: 1.05
    },
    dependencies: [] // Dependencies if the animation needs to react to changes
  });


  useEffect(() => {
    const refs = [introRef1, introRef2, introRef3];

    refs.forEach(ref => {
      if (!ref.current) return;

      gsap.fromTo(ref.current.querySelectorAll('.word'), {
        autoAlpha: .2,
        transform: 'translate3d(0, 0, 0)' // Force hardware acceleration
      }, {
        autoAlpha: 1,
        transform: 'translate3d(0, 0, 0)', // Maintain hardware acceleration
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

  useEffect(() => {
    const tl = gsap.timeline();


    // Étendre l'overlay de droite à gauche
    tl.to(".overlay", { duration: 1.25, scaleX: 1, transformOrigin: 'left', ease: "power1.easeInOut", delay: 2 });

    // Rétracter l'overlay de gauche à droite en changeant le transformOrigin
    tl.to(".overlay", { duration: 1.25, scaleX: 0, transformOrigin: 'right', ease: "power1.easeInOut" })
      .fromTo(".image", { autoAlpha: 0, scale: 1.4 }, { autoAlpha: 1, scale: 1, duration: 1.25, ease: "power1.easeInOut" }, "<");
  });

  /* ---------- GSAP timeline --------- */

  // move upwards by an amount


  return (
    <div id="about">

      <section id="section-hero-about" >

        <div className="container">

          <div className="row">
            <div className="content">
              <SvgFlower
                data-aos="fade"
                data-aos-delay={750}
              />

              <h1 ref={animationRef}>
                <SplitText splitType="letters" str={"A propos de moi"} />
              </h1>

              <p className='intro intro-about' data-aos="fade" data-aos-delay={1600} >


              Forte d'une riche expérience, ma spécialisation s'étend du <b>branding d'entreprises</b> à la <b>création de logos</b> et <b>chartes graphiques</b>, en mettant un accent particulier sur la <b>conception</b> et le <b>développement de sites web</b> innovants.                            </p>

              {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis nemo libero at natus sint exercitationem totam quidem quas assumenda quos quia quis praesentium eveniet ad ex commodi, illum illo nisi.</p> */}

              {/* <Button data-aos="fade-up" data-aos-delay={1850} link="">Télécharger mon CV</Button> */}
            </div>

            <div className="container-image">
              <img className="image" src={image} alt="" />
              <div className="overlay"></div>


            </div>


          </div>

          <BadgeScroll></BadgeScroll>

        </div>

      </section>

      <Section title="Qui suis-je ?" id="about">



        <div className="row" id="row-philosophie">
          <div className="left" data-aos-anchor="#row-philosophie" data-aos="fade-up">
            <h3>(Ma philosophie) <span>01</span></h3>
          </div>

          <div className="right" data-aos-anchor="#row-philosophie" data-aos="fade-up" data-aos-delay="200">

            <p className="intro intro--small" ref={introRef1}>
              <SplitText splitType="words" str={"Au cœur de ma démarche créative se trouve une attention particulière à l'expérience utilisateur. Je suis convaincu que la réussite d'un site web réside dans son habileté à offrir une navigation intuitive, soutenue par un design attrayant et une attention méticuleuse aux détails. Chaque projet est une opportunité de créer des expériences uniques, qui non seulement répondent aux besoins des utilisateurs mais les dépassent, tout en se démarquant dans le paysage numérique actuel."} />
            </p>
          </div>

        </div>

        <div className="row" id="row-demarche">
          <div className="left" data-aos-anchor="#row-demarche" data-aos="fade-up">
            <h3>(Ma demarche) <span>02</span></h3>
          </div>

          <div className="right" data-aos-anchor="#row-demarche" data-aos="fade-up" data-aos-delay="200">
            <p className="intro intro--small" ref={introRef2}>
              <SplitText splitType="words" str={"Ma méthode de travail est fondée sur l'écoute et la collaboration. Je débute chaque projet par une phase de découverte approfondie, visant à comprendre vos objectifs et vos attentes. Cette compréhension me guide tout au long du processus de création, depuis la conception initiale jusqu'à la réalisation finale, en passant par des itérations basées sur vos retours. Mon objectif est de vous fournir une solution personnalisée qui transcende votre vision et favorise l'engagement de votre audience."} />
            </p>
          </div>

        </div>

        <div className="row" id="row-confiance">
          <div className="left" data-aos-anchor="#row-confiance" data-aos="fade-up">
            <h3>(Confiance) <span>03</span></h3>
          </div>

          <div className="right" data-aos-anchor="#row-confiance" data-aos="fade-up" data-aos-delay="200">

            <p className="intro intro--small" ref={introRef3}>
              <SplitText splitType="words" str={"Au-delà de mes compétences techniques, je m'efforce de construire des relations solides et durables avec mes clients, basées sur la confiance, la transparence et une communication fluide. Je suis convaincu que c'est en travaillant main dans la main que nous pouvons atteindre l'excellence et faire de votre projet un véritable succès."} />
            </p>

          </div>

        </div>
        {/* <div className="row" id="row-expertise">
          <div className="left" data-aos-anchor="#row-expertise" data-aos="fade-up">
            <h3>(Domaines d'expertise) <span>04</span>

            </h3>
          </div>

          <div className="right list-item" id="list-item">

            <div className="item" data-aos-anchor="#row-expertise" data-aos="fade-up" data-aos-delay="200">
              <h4>Design Graphique et Identité Visuelle</h4>
              <p>

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque consectetur delectus quae cum ab, tenetur assumenda, qui commodi ad inventore et iusto nam laboriosam! Magni debitis ullam a numquam!
              </p>
            </div>

            <div className="item" data-aos-anchor="#row-expertise" data-aos="fade-up" data-aos-delay="400">
              <h4>Conception de Logos</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque consectetur delectus quae cum ab, tenetur assumenda, qui commodi ad inventore et iusto nam laboriosam! Magni debitis ullam a numquam!</p>
            </div>

            <div className="item" data-aos-anchor="#row-expertise" data-aos="fade-up" data-aos-delay="600">
              <h4>Conception de Flyers, Brochures, et Supports Imprimés</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque consectetur delectus quae cum ab, tenetur assumenda, qui commodi ad inventore et iusto nam laboriosam! Magni debitis ullam a numquam!</p>
            </div>

            <div className="item" data-aos-anchor="#row-expertise" data-aos="fade-up" data-aos-delay="800">
              <h4>UI / UX Design, Prototypage et Wireframing</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque consectetur delectus quae cum ab, tenetur assumenda, qui commodi ad inventore et iusto nam laboriosam! Magni debitis ullam a numquam!</p>
            </div>

            <div className="item" data-aos-anchor="#row-expertise" data-aos="fade-up" data-aos-delay="1000">
              <h4>Développement web front-end</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, eaque consectetur delectus quae cum ab, tenetur assumenda, qui commodi ad inventore et iusto nam laboriosam! Magni debitis ullam a numquam!</p>
            </div>

          </div>
        </div> */}

      </Section >

      <PageTransition />

    </div >
  );

}

export default About
