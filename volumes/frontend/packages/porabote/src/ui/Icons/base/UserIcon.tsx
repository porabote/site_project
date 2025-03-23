import React from "react";
import {IconType} from "../types";

const UserIcon = (props: IconType) => {

  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M71 1H36C32.14 1 29 4.14 29 8V71C29 74.86 32.14 78 36 78H85C88.86 78 92 74.86 92 71V22L71 1ZM71 10.9L82.1 22H71V10.9ZM85 71H36V8H64V29H85V71Z" fill="black"/>
      <path d="M43 36H78V43H43V36Z" fill="black"/>
      <path d="M43 50H78V57H43V50Z" fill="black"/>
      <path d="M64 92H15V29H22V22H15C11.14 22 8 25.14 8 29V92C8 95.86 11.14 99 15 99H64C67.86 99 71 95.86 71 92V85H64V92Z" fill="black"/>
    </svg>
  );
}

export default UserIcon;
