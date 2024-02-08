import React, { Component } from "react";
import "./BadgeScroll.scss";
import SvgFlower from "../SvgFlower"; // Assurez-vous que le chemin est correct

import ReactCurvedText from 'react-curved-text';



class BadgeScroll extends Component {

    render() {


        return (
            <div className="wrapper-scroll-info">
            <div className="badge-scroll">

                <ReactCurvedText
                    width={80}
                    height={80}
                    cx={40}
                    cy={40}
                    rx={18}
                    ry={18}
                    startOffset={null}
                    reversed={true}
                    text="Scroll - Scroll -"
                    textProps={null}
                    textPathProps={null}
                    tspanProps={{ "dy": "-12" }}
                    ellipseProps={null}
                    svgProps={null}
                />

            
                <SvgFlower></SvgFlower>
            </div>
            </div>
        );
    }
}

export default BadgeScroll
