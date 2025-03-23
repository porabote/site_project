import React from 'react';
import BoldIcon from "./svg/bold-icon.svg";

const Bold = (props) => {

  return (
    <div className="text-editor-panel-item" onClick={e => props.wrapInTag(e, 'b')}>
      <img src={BoldIcon} className="text-editor-panel-icon" />
    </div>
  );
};

export default Bold;