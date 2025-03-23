import React, {ChangeEvent, useState, useEffect, useContext, createElement, useRef} from 'react';
import FormContext from "../FormContext";
import {toFloat, toInteger} from "@packages/porabote/src/helpers/FormatHelper";
import {FieldChildType} from "../FormTypes";

type InputType = {
  icons?: any[];
};

const InputMask = (props: FieldChildType<InputType>) => {

    //useEffect(() => {}, []);

    const inputRef = useRef(null);
    let context = useContext(FormContext);

    const [name] = useState(props.name || "");
    const [value, setValue] = useState(context.getValue(name) || "");
    const [isFocused, setIsFocused] = useState(false);
    const [inputType, setInputType] = useState(props.type || 'string');
    const [valueFormat, setValueFormat] = useState(props.valueFormat || 'string');

    const htmlFor = `${inputType}-${Math.random()}`;


    const applyMask = (rawValue: string): string => {

      if (!rawValue.length) {
        return "";
      }

      //var pattern = "\D";
      //re = new RegExp(pattern, "g");
      let value = rawValue.replace(/\D/g, "");//.match(/.{1,4}/g)?.join(" ").substr(0, 19) || "";

      value = '+' + value;
      let newValue = "";
      let cursorValue = 0;
      for (let cursor = 0; cursor <= props.mask.length; cursor++) {

        if (!value[cursorValue]) {
          break;
        }

        if (props.mask[cursor] != 9) {
          newValue += props.mask[cursor];
          if (props.mask[cursor] == value[cursorValue]) {
            cursorValue++;
          }

        } else {
          if (value[cursorValue]) {
            newValue += value[cursorValue];
            cursorValue++;
          } else {
            break;
          }
        }
      }

      return newValue.substr(0, props.mask.length);

    }


    let label = (typeof props.label != "undefined") ?
      <label
        htmlFor={htmlFor}
        className={`form_item__label ${isFocused ? "focused" : ""}`}>
        {props.label}
      </label> : "";

    let disabled = false;
    if (typeof props.disabled === "function") {
      disabled = props.disabled(context);
    } else if (typeof props.disabled != "undefined") {
      disabled = props.disabled;
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;
      let maskedValue = applyMask(newValue);
      setValue(maskedValue);
      context.setValue(name, setTypeFormat(newValue));
    }

    const setTypeFormat = (rawValue: string) => {
      let value = rawValue;
      switch (valueFormat) {
        case "float":
          value = toFloat(rawValue);break;
        case "integer":
          value = toInteger(rawValue);break;
      }

      return value || "";
    }

// const onCLickByIcon = (e) => {
//   setInputType('text');
// }

// let value = context.getValue(name);

    let input = <input
      ref={inputRef}
      type={inputType}
      placeholder={props.placeholder}
      id={htmlFor}
      name={name}
      value={context.getValue(name) || ""}
      disabled={disabled}
      className={props.class || 'form_item__input'}
      autoComplete="off"
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      onChange={onChangeInput}
      onInput={(e: React.ChangeEvent<HTMLInputElement>): void => {
        if (typeof props.onInput !== "function") {
          return;
        }
        props.onInput(e.target.value, {...props});
      }}
    />;

    if (props.type == "hidden") {
      return input;
    }

    const errors = context.validationErrors[props.name];

    return (
      <div className="form_item">
        {label}
        <div className="form_item__input_wrap">
          {input}
          {props.elementProps && props.elementProps.icons &&
            props.elementProps.icons.map((item, index) => {
              return React.cloneElement(item, {
                ...item.props,
                key: index,
                setInputType,
              });
            })
          }

        </div>
        {errors &&
          <div className="form_item__input_error">{Object.keys(errors).map(errorType => {
            return <span key={errorType}>{errors[errorType]}</span>
          })}</div>
        }
      </div>
    );
  }
;

export default InputMask;
