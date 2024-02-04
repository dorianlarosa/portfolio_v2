import React, { Component } from "react";
import "./Button.scss";


class Button extends Component {

    render() {


        return (
            <a className="button">
                <div className="text">Qui suis-je ?</div>
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
            </a>

        );
    }
}

export default Button