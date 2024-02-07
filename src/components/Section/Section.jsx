import React, { Component } from "react";
import { Parallax } from 'react-scroll-parallax';


import "./Section.scss";

import {
    SvgFlower
} from "..";

class Section extends Component {

    render() {

        const { title, children, id } = this.props;

        return (
            <section id={id} className="section">
                <div className="container">
                    <div className="wrapper-flower">
                        <Parallax rotate={[-180, 0]}>
                            <SvgFlower></SvgFlower>
                        </Parallax>
                    </div>

                    <div className="wrapper-h2">
                        <Parallax translateX={[10, -10]}>
                            <h2 data-text={title} className="my-element">
                                <span aria-hidden="true" className="text-grey">{title}</span>

                                <span aria-hidden="true" className="text-grey">{title}</span>

                                <span>{title}</span>
                                <span aria-hidden="true" className="text-grey">{title}</span>

                                <span aria-hidden="true" className="text-grey">{title}</span>
                            </h2>
                        </Parallax>

                    </div>

                    <div className="content-section">
                        {children}
                    </div>
                </div>
            </section>
        );
    }
}

export default Section
