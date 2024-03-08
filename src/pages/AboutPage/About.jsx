import React, { useEffect, useRef, useState } from 'react';
import { PageTransition, Button, BadgeScroll, Section, SvgFlower, SplitText, BannerImage, CustomLink } from "../../components";
import image from './dorian_la_rosa.jpg';

import "./About.scss";
import AOS from 'aos';

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
      delay: .85
    },
    dependencies: [] // Dependencies if the animation needs to react to changes
  });


  useEffect(() => {
    ScrollTrigger.refresh();

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

    const tl = gsap.timeline();


    // Étendre l'overlay de droite à gauche
    tl.to(".overlay", { duration: 1.25, scaleX: 1, transformOrigin: 'left', ease: "sine.inOut", delay: 1.8 });

    // Rétracter l'overlay de gauche à droite en changeant le transformOrigin
    tl.to(".overlay", { duration: 1.25, scaleX: 0, transformOrigin: 'right', ease: "sine.inOut" })
      .fromTo(".image", { autoAlpha: 0, scale: 1.2 }, { autoAlpha: 1, scale: 1, duration: 1.25, ease: "power1.easeInOut" }, "<");

    
      setTimeout(() => {
        ScrollTrigger.refresh();
        AOS.refresh();
      }, 1000);
      return () => {
        // Nettoyage : tuez toutes les instances de ScrollTrigger pour éviter les fuites de mémoire
        tl.kill();

        ScrollTrigger.getAll().forEach(instance => instance.kill());

      };
  

  }, [image]);



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
                data-aos-delay={700}
              />

              <h1 ref={animationRef}>
                <SplitText splitType="letters" str={"A propos de moi"} />
              </h1>

              <p className='intro intro-about' data-aos="fade" data-aos-delay={1500} >
                Fort d'une expérience significative, ma spécialisation couvre principalement le <b>développement de sites web innovants</b>, avec une expertise complémentaire en <b>branding d'entreprises</b>, <b>création de logos</b>, et <b>élaboration de chartes graphiques</b>.
              </p>
              
              {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis nemo libero at natus sint exercitationem totam quidem quas assumenda quos quia quis praesentium eveniet ad ex commodi, illum illo nisi.</p> */}

              {/* <Button data-aos="fade-up" data-aos-delay={1850} link="">Télécharger mon CV</Button> */}

              <CustomLink to="/CV - Dorian LA ROSA.pdf" target="_blank" data-aos="fade" data-aos-delay={1750}>Télécharger mon CV</CustomLink>
            </div>

            <div className="container-image">
              <img className="image" src={image} alt="" />
              <div className="overlay"></div>
            </div>


          </div>

          <BadgeScroll delayReveal={2550}></BadgeScroll>

        </div>

      </section>

      <Section title="Qui suis-je ?" id="about">



        <div className="row" id="row-philosophie">
          <div className="left" data-aos-anchor="#row-philosophie" data-aos="fade-up">
            <h3>(Ma philosophie) <span>01</span></h3>
          </div>

          <div className="right" data-aos-anchor="#row-philosophie" data-aos="fade-up" data-aos-delay="200">

            <p className="intro intro--small" ref={introRef1}>
              <SplitText splitType="words" str={"Au cœur de ma démarche créative se trouve une attention particulière à l'expérience utilisateur. Je suis convaincu que la réussite d'un site web réside dans son habileté à offrir une navigation intuitive, soutenue par un design attrayant et une attention méticuleuse aux détails."} />
              <br /><br />
              <SplitText splitType="words" str={"Chaque projet est une opportunité de créer des expériences uniques, qui non seulement répondent aux besoins des utilisateurs mais les dépassent, tout en se démarquant dans le paysage numérique actuel."} />

            </p>
          </div>

        </div>

        <div className="row" id="row-demarche">
          <div className="left" data-aos-anchor="#row-demarche" data-aos="fade-up">
            <h3>(Ma demarche) <span>02</span></h3>
          </div>

          <div className="right" data-aos-anchor="#row-demarche" data-aos="fade-up" data-aos-delay="200">
            <p className="intro intro--small" ref={introRef2}>
              <SplitText splitType="words" str={"Ma méthode de travail est fondée sur l'écoute et la collaboration. Je débute chaque projet par une phase de découverte approfondie, visant à comprendre vos objectifs et vos attentes."} />
              <br /><br />
              <SplitText splitType="words" str={"Cette compréhension me guide tout au long du processus de création, depuis la conception initiale jusqu'à la réalisation finale, en passant par des itérations basées sur vos retours. Mon objectif est de vous fournir une solution personnalisée qui transcende votre vision et favorise l'engagement de votre audience."} />

            </p>
          </div>

        </div>

        <div className="row" id="row-confiance">
          <div className="left" data-aos-anchor="#row-confiance" data-aos="fade-up">
            <h3>(Confiance) <span>03</span></h3>
          </div>

          <div className="right" data-aos-anchor="#row-confiance" data-aos="fade-up" data-aos-delay="200">

            <p className="intro intro--small" ref={introRef3}>
              <SplitText splitType="words" str={"Au-delà de mes compétences techniques, je m'efforce de construire des relations solides et durables avec mes clients, basées sur la confiance, la transparence et une communication fluide."} />
              <br /><br />
              <SplitText splitType="words" str={"Je suis convaincu que c'est en travaillant main dans la main que nous pouvons atteindre l'excellence et faire de votre projet un véritable succès."} />

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

      <BannerImage />

      <PageTransition />

    </div >
  );

}

export default About
