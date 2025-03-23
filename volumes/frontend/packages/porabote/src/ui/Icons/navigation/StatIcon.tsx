import React from "react";
import {IconType} from "../types";

const StatIcon = (props: IconType) => {

  return (
    <svg width={props.size} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 14.5V19.5M19.5 7.5V19.5M12.5 2.5V19.5" stroke={props.fill} strokeWidth="3" strokeLinecap="square"/>
    </svg>


  );
}

export default StatIcon;
