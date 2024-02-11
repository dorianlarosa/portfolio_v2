import React, { Component } from "react";

import "./ListTags.scss";

class ListTag extends Component {

    render() {
        const { tags } = this.props;

        return (
            <ul className="list-tag">
                {tags.map((tag, index) => (
                    <li key={index}>
                        <span className="tag">
                            {tag.name}
                        </span>
                    </li>
                ))}
            </ul>

        );
    }
}

export default ListTag
