import React from 'react';
import CodeIcon from "./svg/code-icon.svg";

type CodeButtonPropsType = {
  clickCallback: Function;
}

const CodeButton = (props: CodeButtonPropsType) => {
  return (
    <div className="text-editor-panel-item" onClick={props.clickCallback}>
      <img src={CodeIcon} className="text-editor-panel-icon image" />
    </div>
  );
};

export default CodeButton;