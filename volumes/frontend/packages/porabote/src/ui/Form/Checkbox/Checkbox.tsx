import React, {MouseEventHandler, useState, useEffect, useContext} from 'react';
import {FieldChildType} from "../FormTypes";
import FormContext from "../FormContext";

type CheckBoxType = {

};

const Checkbox = (props: FieldChildType<CheckBoxType>) => {

  const context = useContext(FormContext);

  const initChecked = () => {
    if (props.checked) {
      return true;
    } else if (context) {
      return context.getValue(props.name) ? true : false;
    }

    return false;
  }

  const [isChecked, setIsChecked] = useState(initChecked());
  const [htmlFor, setHtmlFor] = useState(`checkbox-${Math.random()}`);
  const [value, setValue] = useState(context.getValue(props.name) || "");

  useEffect(() => {

    if (props.value != value) {
      if (props.name) {
        changeStatus(!!context.getValue(props.name), null);
      }
    }
  }, [props.value]);//props.value


  let disabled: boolean | undefined = false;
  if (typeof props.disabled === "function") {
    disabled = props.disabled(props.value);
  } else if (props.disabled) {
    props.disabled ? props.disabled : false;
  }

  const changeStatus = async (status: boolean | null = null, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement> | null) => {

    let newStatus = status ? 1 : 0;

    // If first init
    if (typeof status != "boolean") {
      newStatus = (!!props.value && props.value.length) ? 1 : 0;
    }

    setIsChecked(newStatus ? true : false);

    if (context) {
      context.setValue(props.name, newStatus);
    }

    setValue(newStatus);

    if (typeof status != "boolean") {
      return;
    }

    if (typeof props.onSelect == "function" && event) {
      let callbackResult: {[key: string]: any} | undefined = await props.onSelect(event, {...props, status});
      if (typeof callbackResult != "undefined") {
        setIsChecked(callbackResult.status);
      }
    }


  }

  return (
    <div className={props.className ? `${props.className}-wrap` : "form-item__checkbox-wrap"}>
      <input
        type="checkbox"
        id={htmlFor}
        className={props.className || 'form-item__checkbox'}
        disabled={disabled}
        name={props.name}
        value={props.value || ""}
        checked={isChecked}
        onClick={(event: React.MouseEvent<HTMLInputElement>) => {
          const { currentTarget } = event;
          if (currentTarget) {
            const ischecked = !!(event.currentTarget.checked);
            changeStatus(ischecked, event);
          }
        }}
        onChange={e => {
          if (typeof props.onChange == "function") {
            props.onChange(e, props);
          }
          //let status = (e.target.checked) ? 1 : 0
        }}
      />
      <label htmlFor={htmlFor}>{props.label}</label>
    </div>
  )
}

export default Checkbox;
