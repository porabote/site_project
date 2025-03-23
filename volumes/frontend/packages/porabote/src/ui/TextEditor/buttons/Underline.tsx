import React from 'react';
import UnderlineIcon from "./svg/underline-icon.svg";

const Underline = (props) => {
  return (
    <div className="text-editor-panel-item">
      <img src={UnderlineIcon} className="text-editor-panel-icon underline" onClick={e => props.wrapInTag(e, 'u')}/>
    </div>
  );
};

export default Underline;