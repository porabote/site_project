import React from "react";
import {IconType} from "../types";

const DoneIcon = (props: IconType) => {

    return (
        <svg
            width={props.size}
            height={props.size}
            viewBox="0 0 20 20"
            fill={props.fill}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin meet"
        >
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M19.2 9.6C19.2 14.9019 14.9019 19.2 9.6 19.2C4.29807 19.2 0 14.9019 0 9.6C0 4.29807 4.29807 0 9.6 0C14.9019 0 19.2 4.29807 19.2 9.6ZM8.13822 13.281C8.53702 13.6685 9.18437 13.6685 9.58342 13.281L14.1008 8.89385C14.2924 8.70785 14.4 8.45537 14.4 8.19225C14.4 7.92914 14.2924 7.67668 14.1008 7.49061C13.7017 7.10315 13.0544 7.10315 12.6556 7.49061L9.04342 10.9986C8.94254 11.0962 8.77909 11.0962 8.67838 10.9986L7.34434 9.70321C6.94537 9.31577 6.29799 9.31577 5.89921 9.70321C5.50023 10.0905 5.50023 10.7192 5.89921 11.1065L8.13822 13.281Z"
                  fill={props.fill}/>
        </svg>


    );
}

export default DoneIcon;
