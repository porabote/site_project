import React from 'react';
import ClearIcon from "./svg/clear-icon.svg";

const Clear = (props) => {
  return (
    <div className="text-editor-panel-item" onClick={e => props.clearText(e)}>
      <img src={ClearIcon} className="text-editor-panel-icon clear" />
    </div>
  );
};

export default Clear;