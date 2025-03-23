import React, {useState, MouseEvent} from 'react'
import {OptionType, SelectOptionValueType} from "../types";

export type IOption = (props: OptionType) => JSX.Element;

const Option: IOption = (props: OptionType) => {

  const [value, setValue] = useState<SelectOptionValueType>(props.value);
  const [title] = useState(props.children);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!props.isMultiple && typeof props.onSelect == "function") {
      props.onSelect(e, {newValue: value, title});
    } else if (props.isMultiple && typeof props.onSelectMultiple == "function") {
      props.onSelectMultiple(e, {newValue: value, title});
    }
  }

  return (
    <div
      onMouseDown={onMouseDown}
      className="form-item__select__drop-link">
      {props.children}
    </div>
  )
}

export default Option;
