import React from 'react';
import "./style.less";
import {AccordionType} from "./types";

const Accordion = (props: AccordionType) => {

  return (
    <div>
      {props.children.map((child, index) => {
        return React.cloneElement(child, {key: index});
      })}
    </div>
  );
};

export default Accordion;