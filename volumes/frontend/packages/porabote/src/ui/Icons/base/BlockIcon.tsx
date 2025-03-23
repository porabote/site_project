import React from "react";
import {IconType} from "../types";

const BlockIcon = (props: IconType) => {

  return (
    <svg width={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM2.55852 12C2.55852 17.2144 6.78561 21.4415 12 21.4415C17.2144 21.4415 21.4415 17.2144 21.4415 12C21.4415 6.78561 17.2144 2.55852 12 2.55852C6.78561 2.55852 2.55852 6.78561 2.55852 12Z" fill="black"/>
      <rect x="19.0065" y="4.22083" width="2.6" height="20" transform="rotate(47.4042 19.0065 4.22083)" fill="black"/>
    </svg>

  );
}

export default BlockIcon;
