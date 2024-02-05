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
                    width={130}
                    height={130}
                    cx={65}
                    cy={65}
                    rx={27.5}
                    ry={27.5}
                    startOffset={null}
                    reversed={true}
                    text="Scroll - Scroll - Scroll - "
                    textProps={null}
                    textPathProps={null}
                    tspanProps={{ "dy": "-25" }}
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
