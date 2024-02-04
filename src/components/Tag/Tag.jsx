import React, { Component } from "react";

import "./Tag.scss";

class Tag extends Component {

    render() {
        const { title } = this.props;

        return (
            <span className="tag">
               {title}
            </span>
        );
    }
}

export default Tag
