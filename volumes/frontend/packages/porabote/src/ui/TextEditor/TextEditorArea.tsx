import React, {useContext, useState, useEffect} from 'react';
import {FormContext, TextArea} from "@porabote/ui/Form";
import {TextEditorContext} from "./TextEditor";

const TextEditorArea = (props) => {

  const context = useContext(FormContext);
  const {name, textAreaRef, areaElement} = useContext(TextEditorContext);

  useEffect(() => {
    if (props.elementProps && props.elementProps.minHeight) {
      setMinHeight(props.elementProps.minHeight);
    }
  }, [props.elementProps]);

  const initValue = () => {
    let value = context.getValue(name);
    return value;
  }

  const onInputHandle = (e) => {
    if (typeof props.onInput == "function") props.onInput(e, {...props});

    let value = "";
    if (areaElement == "div") {
      value = textAreaRef.current.innerHTML;
    } else if (areaElement == "textarea") {
      value = textAreaRef.current.value;
    }

    context.setValue(name, value);
  }

  const [value, setValue] = useState(initValue);
  const [minHeight, setMinHeight] = useState(100);

  if (areaElement == "textarea") {
    console.log();
    return <TextArea
      style={{minHeight: `${minHeight}px`}}
      placeholder="Текст..."
      inputRef={textAreaRef}
      name={props.name}
      onInput={onInputHandle}
    />
  }

  return (
    <div>
        <div
          style={{minHeight: `${minHeight}px`}}
          ref={textAreaRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          placeholder="Текст..."
          className="text-editor-area"
          dangerouslySetInnerHTML={{__html: value}}
          onInput={onInputHandle}
          name={props.name}
        >
        </div>

    </div>
  );
};

export default TextEditorArea;
