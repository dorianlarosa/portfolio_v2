import React, { Component } from "react";

const SvgFlower = React.forwardRef((props, ref) => {

    const { id, ...restProps } = props;

    return (
        <svg ref={ref} className="svg-flower" id={id} xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            fill="none"
            viewBox="0 0 200 200"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns:svgjs="http://svgjs.dev/svgjs"
            {...restProps}
        >
            <path
                fill="var(--white-color)"
                fillRule="evenodd"
                d="M100 100s12.5-33.474 12.5-57.143C112.5 19.187 106.904 0 100 0S87.5 19.188 87.5 42.857C87.5 66.527 100 100 100 100Zm0 0s14.831 32.508 31.567 49.245c16.737 16.737 34.262 26.347 39.144 21.466 4.881-4.882-4.729-22.407-21.466-39.144C132.508 114.831 100 100 100 100Zm0 0s33.474-12.5 57.143-12.5C180.812 87.5 200 93.096 200 100s-19.188 12.5-42.857 12.5S100 100 100 100Zm0 0s-32.508 14.831-49.245 31.567c-16.737 16.737-26.347 34.262-21.466 39.144 4.882 4.881 22.407-4.729 39.144-21.466C85.169 132.508 100 100 100 100Zm0 0c.028.074 12.5 33.5 12.5 57.143 0 23.669-5.596 42.857-12.5 42.857s-12.5-19.188-12.5-42.857S100 100 100 100Zm0 0S66.526 87.5 42.857 87.5C19.187 87.5 0 93.096 0 100s19.188 12.5 42.857 12.5C66.527 112.5 100 100 100 100Zm0 0s32.508-14.83 49.245-31.567c16.737-16.737 26.347-34.262 21.466-39.144-4.882-4.881-22.407 4.73-39.144 21.466C114.831 67.492 100 100 100 100ZM68.433 50.755C85.169 67.492 100 100 100 100S67.492 85.17 50.755 68.433C34.018 51.696 24.408 34.17 29.29 29.289c4.882-4.881 22.407 4.73 39.144 21.466Z"
                clipRule="evenodd"
            ></path>
        </svg>);

});

export default SvgFlower
