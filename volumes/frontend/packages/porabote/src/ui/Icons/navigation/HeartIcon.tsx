import React from "react";
import {IconType} from "../types";

const HeartIcon = (props: IconType) => {

  return (
    <svg width={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.55 12.4513L12 21.0013L3.45002 12.4513C1.51666 10.518 1.51666 7.38338 3.45002 5.45002C5.38338 3.51666 8.51798 3.51666 10.4513 5.45002L11.2929 6.29157L12 6.99868L12.7071 6.29157L13.5487 5.45002C15.482 3.51666 18.6166 3.51666 20.55 5.45002C22.4833 7.38338 22.4833 10.518 20.55 12.4513Z" stroke={props.fill} strokeWidth="2"/>
    </svg>


  );
}

export default HeartIcon;
