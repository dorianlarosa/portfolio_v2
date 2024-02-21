

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import bannerHome from './banner.jpg';


import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import "./BannerImage.scss";


const BannerImage = () => {

    const refBannerImage = useRef(null);


    useEffect(() => {
        gsap.fromTo(refBannerImage.current,
            {
              y: "-15%", // Commence avec un petit décalage vers le haut pour l'effet parallaxe
            },
            {
              y: "15%", // Déplace l'image vers le bas au fur et à mesure que l'utilisateur fait défiler la page
              ease: "none",
              scrollTrigger: {
                trigger: refBannerImage.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true, // Lie l'animation au défilement
              }
            }
          );
    }, []);




    return (
        <div id="banner-image" >
        <div className='parallax-container'>
          <img rel="preload" ref={refBannerImage} src={bannerHome} className="parallax-image" alt="Parallax Image" />
        </div>
        </div>
    );

}

export default BannerImage
