import React from 'react';

type selectTagProps = {
  child: number | string;
  removeTag: (key: number | string) => void;
  value: number | string;
};

const SelectTag = (props: selectTagProps) => {

  const removeTag = () => {
    props.removeTag(props.value);
  }

  return (
    <div key={props.value} className="select-tag">
          <span className="select-tag-close" onClick={removeTag}>
              x
          </span>
      {props.child}
    </div>
  );
};

export default SelectTag;
