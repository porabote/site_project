import React, {useState, useEffect, useContext} from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {FormContext} from "@porabote/ui/Form";
import {FieldType} from "../FormTypes";
import "react-datepicker/dist/react-datepicker.css";
import "./InputDateTime.less";

const InputDateTime = (props: FieldType<any>) => {

  let context = useContext(FormContext);

  const [value, setValue] = useState(props.value || null);

  const {onChange} = props;
  
  const setStartHandler = (value: Date) => {
    setValue(value);
  }

  const onChangeHandler = (date: Date) => {

    if (context) {
      context.setValue(props.name || "", moment(date).format('YYYY-MM-DD HH:mm:ss'));
    }
    setValue(date);

    if (typeof props.onSelect == "function") {
      onChange({context, ...props, newValue: date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : null});
    }

    if (typeof props.onChange == "function") {
      onChange({context, ...props, newValue: date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : null});
    }
  }

  useEffect(() => {
    let value = props.value;

    if (!value) {
      value = context.getValue(props.name);
    }

    if (typeof props.value == "string" && props.value.length > 0) {
      value = new Date(props.value);
    }

    setValue(value);
  }, []);

  const errors = context.validationErrors[props.name];

  return (
    <div>

      <div className={`form_item ${props.classModifier ? props.classModifier : ''}`}>
        <label className="form_item__label">{props.label}</label>

        <DatePicker
          //locale="ru-RU"
          format="dd.MM.yy HH:mm"
          selected={value}
          // allowClear={props.allowClear ? props.allowClear : false}
          // disableCalendar={props.disableCalendar || false}
          onChange={onChangeHandler}
          // isClearable
          dateFormat="yyyy/MM/dd HH:mm"
          className="prb-datetime-input"
          wrapperClassName="prb-datetime"
          // timeClassName="prb-datetime-time-input"
          showTimeSelect
          showTimeInput
          timeFormat="HH:mm"
          timeIntervals={15}
        />
      </div>

      {errors &&
        <div className="form_item__input_error">{Object.keys(errors).map(errorType => {
          return <span key={errorType}>{errors[errorType]}</span>
        })}</div>
      }

    </div>
  )
}

export default InputDateTime;
