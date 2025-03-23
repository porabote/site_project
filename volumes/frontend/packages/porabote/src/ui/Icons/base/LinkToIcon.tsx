import React from "react";

const LinkToIcon = (props: { style: {} }) => {

  return (
    <svg
      width={props.size}
      height={props.size}
      xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 459 459"
      fill={props.fill}
         >
      <g>
        <g id="share">
          <path
            d="M459,216.75L280.5,38.25v102c-178.5,25.5-255,153-280.5,280.5C63.75,331.5,153,290.7,280.5,290.7v104.55L459,216.75z"/>
        </g>
      </g>
    </svg>
  );
}

export default LinkToIcon;
