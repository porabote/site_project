import React from "react";

const CloseIcon = (props: { size: string, style: {} }) => {

  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox={`0 0 20 20`}
      preserveAspectRatio="xMinYMin meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2.10511L17.8949 0L10 7.8949L2.10511 0L0 2.10511L7.8949 10L0 17.8949L2.10511 20L10 12.1051L17.8949 20L20 17.8949L12.1051 10L20 2.10511Z" fill={props.fill}/>
      <path d="M20 2.10511L17.8949 0L10 7.8949L2.10511 0L0 2.10511L7.8949 10L0 17.8949L2.10511 20L10 12.1051L17.8949 20L20 17.8949L12.1051 10L20 2.10511Z" stroke={props.fill}/>
    </svg>
  );
}

export default CloseIcon;
