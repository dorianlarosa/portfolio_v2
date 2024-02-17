import React, { Component, useRef, useEffect } from "react";
import "./BadgeScroll.scss";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BadgeScroll = ({ delayReveal = 0 }) => {

    const scrollbadgeRef = useRef(null);
    useEffect(() => {

        console.log(delayReveal);
        gsap.fromTo(scrollbadgeRef.current,
            {
                autoAlpha: 1,
            },
            {
                autoAlpha: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: scrollbadgeRef.current,
                    start: "top bottom",
                    end: "bottom 70%",
                    scrub: true, // Lie l'animation au défilement
                }
            }
        );
    }, []);
    return (
        <>
            <div ref={scrollbadgeRef} className="wrapper-scroll-info"
            >
                <div className="badge-scroll" data-aos="fade" data-aos-delay={delayReveal} data-aos-anchor="#header">

                    <div className="mouse-icon"><div className="wheel"></div></div>
                </div>
            </div>
        </>

    );

}

export default BadgeScroll
