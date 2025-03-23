import React, {useRef, useState, createContext} from 'react';
import TextEditorPanel from "./TextEditorPanel";
import TextEditorArea from "./TextEditorArea";
import "./TextEditor.less";

export const TextEditorContext = createContext({
  name: "",
  areaElement: "div",
  textAreaRef: null,
});

type TextEditorPropsType = {
  name: string;
  label: string;
}

const TextEditor = (props: TextEditorPropsType) => {

  const textAreaRef = useRef(null);
  const [areaElement, setAreaElement] = useState("div");

  const toggleAreaElement = () => {
    setAreaElement(areaElement == "div" ? "textarea" : "div");
  }

  return (
    <TextEditorContext.Provider value={{
      name: props.name,
      areaElement,
      textAreaRef,
      toggleAreaElement,
    }}>
      <div className="text-editor">
        {props.label ? <div className="text-editor-label">{props.label}</div> : null}
        <TextEditorPanel {...props}/>
        <TextEditorArea {...props}/>
      </div>
    </TextEditorContext.Provider>
  );
};

export default TextEditor;
