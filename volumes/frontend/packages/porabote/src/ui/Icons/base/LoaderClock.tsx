import React from "react";
import {IconType} from "../Icon";

const LoaderClock = (props: IconType) => {

  return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width={props.size} style={{shapeRendering: "auto", display: "block"}}>
          <g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" stroke={props.fill} fill="none" cy="50" cx="50">
          <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
      </circle><g></g></g>
      </svg>
  );
}

export default LoaderClock;
