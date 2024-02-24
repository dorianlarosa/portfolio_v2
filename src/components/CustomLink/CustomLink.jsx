import React, { Component } from "react";
import "./CustomLink.scss";
import { Link } from 'react-router-dom';
import CustomCursorContext from "../CustomCursor/context/CustomCursorContext";


class CustomLink extends Component {
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
        const { to, children, target = "_self", ...restProps } = this.props;
        return (
            <div {...restProps}>
                <Link className="custom-link" to={to} target={target} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    {children}

                </Link>
            </div>

        );
    }
}

export default CustomLink
