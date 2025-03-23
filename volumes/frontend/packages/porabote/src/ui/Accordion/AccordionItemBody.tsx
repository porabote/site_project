import React from 'react';
import {AccordionItemBodyType} from "./types";

const AccordionItemBody = (props: AccordionItemBodyType) => {
  return (
    <div className={`prb-accordion__item__body ${props.isOpened ? 'active' : ''} ${props.className ? props.className : ''}`}>
      {props.children}
    </div>
  );
};

export default AccordionItemBody;