import React from "react";
import {IconType} from "../types";

const ClubIcon = (props: IconType) => {

  return (
    <svg width={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.7728 2.53834C18.7515 2.54085 18.7304 2.54437 18.7094 2.54889H5.28196C5.26435 2.5482 5.24672 2.5482 5.22912 2.54889C5.12861 2.5557 5.0309 2.58487 4.9431 2.63426C4.8553 2.68364 4.77963 2.752 4.72162 2.83435L0.661675 8.58595C0.572864 8.71188 0.529695 8.86435 0.539304 9.01815C0.548914 9.17195 0.610727 9.31787 0.714522 9.43177L11.4354 21.157C11.4882 21.2516 11.563 21.3321 11.6534 21.3918C11.7438 21.4515 11.8473 21.4886 11.955 21.5C12.0628 21.5114 12.1717 21.4968 12.2726 21.4573C12.3735 21.4179 12.4635 21.3548 12.5349 21.2733L23.3615 9.43177C23.4652 9.31787 23.5271 9.17195 23.5367 9.01815C23.5463 8.86435 23.5031 8.71188 23.4143 8.58595L19.3544 2.83435C19.2902 2.73999 19.2033 2.66338 19.1016 2.61162C19 2.55987 18.8869 2.53466 18.7728 2.53834ZM6 4.27227H10.2148L6.84674 8.30048L6 4.27227ZM13.6707 4.27227H18.4663L17.1069 8.30048L13.6707 4.27227ZM12.038 4.27227L15.3472 8.30048H8.72872L12.038 4.27227ZM6 4.27227L6.84674 8.30048H3.01597L4.50799 6.28638L6 4.27227ZM18.4663 4.27227L19.8936 6.28638L21.3209 8.30048H17.1069L18.4663 4.27227ZM2.75509 9.6538H6.84673L10.0397 17.6257L2.75509 9.6538ZM8.29522 9.6538H15.7808L12.038 18.9896L8.29522 9.6538ZM17.2292 9.6538H21.3209L14.0362 17.6257L17.2292 9.6538Z" fill={props.fill}/>
    </svg>

  );
}

export default ClubIcon;
