import React from 'react';
import {AccordionItemType} from "./types";

const AccordionItemTab = (props: AccordionItemTabType) => {

  const setIsOpened = () => {
    props.setIsOpened(props.isOpened ? false : true);
  }

  return (
    <div className={`prb-accordion__item__tab ${props.class ? props.class : ''}`} onClick={setIsOpened}>
      {props.children}
      {/*<ArrowDropDownIcon/>*/}
    </div>
  );
};

export default AccordionItemTab;