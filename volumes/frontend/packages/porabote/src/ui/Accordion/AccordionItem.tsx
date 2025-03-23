import React, {useState} from 'react';
import {AccordionItemType} from "./types";

const AccordionItem = (props: AccordionItemType) => {

  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="prb-accordion__item">
      {React.cloneElement(props.children[0], {isOpened, setIsOpened})}
      {React.cloneElement(props.children[1], {isOpened})}
    </div>
  );
};

export default AccordionItem;