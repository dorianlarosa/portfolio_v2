import React, { Component } from "react";

import "./Section.scss";

import {
    SvgFlower
} from "../";

class Section extends Component {

    render() {

        const { title, children, id } = this.props;

        return (
            <section id={id} className="section container">

                <SvgFlower></SvgFlower>

                <div className="wrapper-h2">

                    <h2 data-lg-scroll data-lg-scroll-trigger="50% 50%" data-text={title} className="my-element">
                        <span aria-hidden="true" className="text-grey">{title}</span>

                        <span aria-hidden="true" className="text-grey">{title}</span>

                        <span>{title}</span>
                        <span aria-hidden="true" className="text-grey">{title}</span>

                        <span aria-hidden="true" className="text-grey">{title}</span>

                    </h2>
                </div>

                <div className="content-section">

                    {children}

                </div>
            </section>
        );
    }
}

export default Section
