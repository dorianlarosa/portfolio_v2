import React, { Component, useRef, useEffect } from "react";
import "./BadgeScroll.scss";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BadgeScroll = () => {

    const scrollbadgeRef = useRef(null);
    useEffect(() => {


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
            <div ref={scrollbadgeRef} className="wrapper-scroll-info">
                <div className="badge-scroll">

                    <div className="mouse-icon"><div className="wheel"></div></div>
                </div>
            </div>
        </>

    );

}

export default BadgeScroll
