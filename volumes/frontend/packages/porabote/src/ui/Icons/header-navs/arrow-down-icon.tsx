import React from "react";
import {IconType} from "../types";

const ArrowDownIcon = (props: IconType) => {

  return (
    <svg width={props.size} viewBox="0 0 560 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M280 224.181L68.869 11.889C53.113 -3.96999 27.569 -3.96999 11.815 11.889C-3.93899 27.746 -3.93899 53.459 11.815 69.32L249.447 308.257C257.842 316.708 269.009 320.511 280 319.955C290.993 320.511 302.159 316.708 310.555 308.257L548.186 69.32C563.942 53.46 563.942 27.749 548.186 11.889C532.43 -3.97099 506.887 -3.96999 491.135 11.889L280 224.181Z" fill="black"/>
    </svg>

  );
}

export default ArrowDownIcon;