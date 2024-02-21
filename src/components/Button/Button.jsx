import React, { Component } from "react";
import "./Button.scss";
import { Link } from 'react-router-dom';
import CustomCursorContext from "../CustomCursor/context/CustomCursorContext";


class Button extends Component {
    static contextType = CustomCursorContext;

    // Gestionnaire d'événements pour le survol
    handleMouseEnter = () => {
        this.context.setType("link"); // Utilisez le type que vous voulez montrer au survol
    };

    // Gestionnaire d'événements pour le sortir du survol
    handleMouseLeave = () => {
        this.context.setType("default"); // Retour au type par défaut
    };

    render() {
        const { link, children, ...restProps } = this.props;
        return (
            <div {...restProps}>
            <Link  className="button" to={link} target="_blank" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div className="text">{children}</div>
                <div className="icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-up-right"
                    >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                    </svg>


                </div>
            </Link>
            </div>

        );
    }
}

export default Button
