import React from "react";
import {IconType} from "../types";

const SettingsIcon = (props: IconType) => {

  return (
    <svg width={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 7H11" stroke={props.fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 17H5" stroke={props.fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 20C18.6569 20 20 18.6569 20 17C20 15.3431 18.6569 14 17 14C15.3431 14 14 15.3431 14 17C14 18.6569 15.3431 20 17 20Z" stroke={props.fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 10C8.65685 10 10 8.65685 10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10Z" stroke={props.fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
}

export default SettingsIcon;