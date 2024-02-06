import React, { Component } from "react";

import "./ListTags.scss";

class ListTag extends Component {

    render() {
        const { tags } = this.props;

        return (
            <ul className="list-tag">
                {tags.map((tag) => (
                    <li key={tag.id}>
                        <span className="tag">
                            {tag.attributes.nom}
                        </span>
                    </li>
                ))}
            </ul>

        );
    }
}

export default ListTag
