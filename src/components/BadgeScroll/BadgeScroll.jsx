import React, { Component } from "react";
import "./BadgeScroll.scss";
import SvgFlower from "../SvgFlower"; // Assurez-vous que le chemin est correct

import ReactCurvedText from 'react-curved-text';



class BadgeScroll extends Component {

    render() {


        return (
            <>
                <div className="wrapper-scroll-info">
                    <div className="badge-scroll">

                        <div className="mouse-icon"><div className="wheel"></div></div>
                    </div>
                </div>
            </>

        );
    }
}

export default BadgeScroll
