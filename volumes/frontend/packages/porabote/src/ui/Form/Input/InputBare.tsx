import React, {useContext} from 'react';
import {FieldChildType} from "../Field/FieldTypes";
import {FormContext} from "@app/form";

const InputBare = (props: FieldChildType) => {

  return (
    <span style={{position: 'relative'}}>
      <input
        disabled={props.disabled || false}
        type={props.type || 'text'}
        value={props.value || ''}
        placeholder={props.placeholder}
        name={props.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {

          if (!props.formContext) return;

          if (props.formContext.entity) {
            props.formContext.setAttribute(props.name, e.target.value);
          }

          if (typeof props.onChange === "function") {
            props.onChange(e.target.value, props.formContext, props);
          }
        }}
        // onMouseEnter={() => {
        // }}
        // onMouseLeave={() => {
        // }}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (typeof props.onKeyUp === "function") {
            props.onKeyUp(
              e,
              {
                name: props.name,
                value: e.currentTarget.value,
                formContext: props.formContext
              },
            )
          }
        }}
        className={props.className || 'input-mini'}
        autoComplete='off'
        style={props.style || {}}
      />
    </span>
  );

}

export default InputBare
