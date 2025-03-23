import React from "react";
import {IconType} from "../types";

const EditIcon = (props: IconType) => {

  return (
    <svg width={props.size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 28.5V36H7.5L29.63 13.87L22.13 6.37L0 28.5ZM35.41 8.09C36.19 7.31 36.19 6.04 35.41 5.26L30.74 0.590005C29.96 -0.189995 28.69 -0.189995 27.91 0.590005L24.25 4.25L31.75 11.75L35.41 8.09Z"
        fill="black"/>
    </svg>
  );
}

export default EditIcon;
