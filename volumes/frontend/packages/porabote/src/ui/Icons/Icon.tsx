import React, {cloneElement, MouseEventHandler, useState} from "react";
import "./Icon.less";
import {IconType} from "./types";

const Icon = (props: IconType) => {

  const [size, setSize] = useState(props.size || "16");
  const fill = props.fill || "#252525";
  const fillHover = props.fillHover || fill;

  const [isHovered, setIsHovered] = useState(false);

  let [style] = useState(Object.assign(
    {...props.style} || {},
    {width: `${size}px`, height: `${size}px`}
  ));

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.handleOnMouseDown) {
      props.handleOnMouseDown(event, props);
    }
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.handleOnMouseUp) {
      //console.log(props, 88);
      props.handleOnMouseUp(event, props);
    }
  }

  return (
    <div
      className={props.className ? props.className : "icon-prb"}
      onClick={props.onClick}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {props.children && cloneElement(props.children, {
        style,
        size,
        fill: isHovered ? fillHover : fill,
      })}
    </div>
  );
};

export default Icon;
