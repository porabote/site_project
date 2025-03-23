import React, {useContext, useState} from 'react';
import Icon, {LoaderClockIcon} from "@packages/porabote/src/ui/Icons";
import {ButtonPropsType} from "../FormTypes";
import FormContext from "../FormContext";

const loaderIcon = <Icon><LoaderClockIcon/></Icon>

const Button = (props: ButtonPropsType) => {

  let context = useContext(FormContext);

  const [className, setClassName] = useState(props.class || "prb-button");
  const [icon, setIcon] = useState(props.icon || loaderIcon);
  const [style, setStyle] = useState(props.style || {});
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (props.type == "submit") {
      context.onSubmit(context);
    } else {
      if (!isButtonLoading && typeof props.onClick !== "undefined") {
        props.onClick(event, {...props, context});
      }
    }
  }

  let isVisible = typeof props.isVisible != "undefined" ? props.isVisible({...props}) : true;

  if (!isVisible) {
    return <></>
  }

  return (

      <div
        className={`${className} ${isButtonLoading ? "" : ""}`}
        style={{
          backgroundImage: icon ? `url(${icon})` : "none",
          ...style,
        }}
        onClick={handleClick}
      >
        {isButtonLoading && loaderIcon}
        {props.children &&
          props.children
        }
        {props.label}
      </div>

  );
};

export default Button;
