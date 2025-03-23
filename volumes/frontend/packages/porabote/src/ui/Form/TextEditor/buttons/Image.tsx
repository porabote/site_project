import React from 'react';
import ImageIcon from "./svg/image-icon.svg";

const Image = (props) => {
  return (
    <div className="text-editor-panel-item" onClick={props.openInsertImagePanel}>
      <img src={ImageIcon} className="text-editor-panel-icon image" />
    </div>
  );
};

export default Image;