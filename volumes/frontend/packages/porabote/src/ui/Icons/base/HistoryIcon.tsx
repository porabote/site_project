import * as React from "react";
import {IconType} from "../types";

const HistoryIcon = (props: IconType) => {

    const {size, fill} = props;

    return (
        <svg width={size} fill="none" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9V19L25.6666 22.3333M35.6666 19C35.6666 28.2047 28.2047 35.6667 19 35.6667C9.79523 35.6667 2.33331 28.2047 2.33331 19C2.33331 9.79525 9.79523 2.33333 19 2.33333C28.2047 2.33333 35.6666 9.79525 35.6666 19Z" stroke={fill} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
}

export default HistoryIcon;
