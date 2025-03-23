import React from 'react';
import ItalicIcon from "./svg/italic-icon.svg";

const Italic = (props) => {
  return (
    <div className="text-editor-panel-item">
      <img src={ItalicIcon} className="text-editor-panel-icon" onClick={e => props.wrapInTag(e, 'i')}/>
    </div>
  );
};

export default Italic;