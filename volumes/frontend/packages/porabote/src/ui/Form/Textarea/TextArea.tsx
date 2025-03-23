import React, {useContext, useState} from 'react';
import {FormContext} from "@porabote/ui/Form";
import "../assets/textarea.less";

const TextArea = (props) => {

  let context = useContext(FormContext);

  const initValue = () => {
    if (props.value) {
      return props.value;
    }
    return context.getValue(name) || "";
  }

  const [name] = useState(props.name || "");
  const [value, setValue] = useState(initValue());

  const onChangeHandler = (e) => {
    context.setValue(props.name, e.target.value);
    setValue(e.target.value);
  }

  return (

    <div className="form_item">
      <div className="form_item__label">{props.label}</div>
      <div className="form-item__textarea-wrap">
      <textarea
        style={props.style || {}}
        ref={props.inputRef}
        className={props.className || "form-textarea"}
        rows={1}
        value={value}
        disabled={props.disabled || false}
        placeholder={props.placeholder || ''}
        onChange={onChangeHandler}
        onInput={(e) => {
          if (typeof props.onInput == "function") {
            props.onInput(e.target.value, {...props});
          }
        }}
      />

      </div>
    </div>
  );
};

export default TextArea;
