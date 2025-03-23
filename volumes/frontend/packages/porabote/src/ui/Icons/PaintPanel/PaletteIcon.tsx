import React from "react";
import {IconType} from "../types";

const PaletteIcon = (props: IconType) => {

  return (
    <svg width={props.size} viewBox="0 0 123 113" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M56.66 105.35C50.72 109.95 43.26 112.69 35.16 112.69C15.74 112.69 0 96.95 0 77.53C0 64.06 7.58 52.36 18.7 46.46C20.66 53.42 24.38 59.65 29.35 64.62C33.99 69.26 39.73 72.82 46.14 74.86C46.08 75.76 46.05 76.67 46.05 77.59C46.06 88.25 50.07 97.98 56.66 105.35Z" fill="#6BBE66"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M122.88 77.59C122.88 97.01 107.14 112.75 87.72 112.75C68.3 112.75 52.56 97 52.56 77.59C52.56 77.18 52.57 76.77 52.58 76.36C54.61 76.66 56.69 76.82 58.81 76.82C70.31 76.82 80.73 72.16 88.27 64.62C93.72 59.17 97.67 52.21 99.44 44.43C113.1 49.26 122.88 62.28 122.88 77.59Z" fill="#FF4141"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M93.97 35.16C93.97 54.58 78.23 70.32 58.81 70.32C39.39 70.32 23.65 54.58 23.65 35.16C23.65 15.74 39.39 0 58.81 0C78.23 0 93.97 15.74 93.97 35.16Z" fill="#00A1F1"/>
    </svg>
  );
}

export default PaletteIcon;
