import React, {useState, useEffect, useContext} from "react";
import DatePicker from 'react-date-picker';
import moment from 'moment';
import FormContext from "../FormContext";
import {FieldChildType} from "../FormTypes";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import "./InputDate.less";

const InputDate = (props: FieldChildType<any>) => {

  let context = useContext(FormContext);


  const [startDate, setStartDate] = useState(null);

  const setStartHandler = (value: Date) => {
    setStartDate(value);
  }

  const onChangeHandler = (date: Date) => {

    if (context) {
      context.setValue(props.name || "", moment(date).format('YYYY-MM-DD HH:mm:ss'));
    }
    setStartDate(date);

    if (typeof props.onSelect == "function") {
      props.onSelect(null, {context, ...props, newValue: date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : null});
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

    setStartDate(value);
  }, []);

  const convertDate = (inputFormat: string) => {
    function pad(s: number) {
      return (s < 10) ? '0' + s : s;
    }
    let d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
  }

  const errors = context.validationErrors[props.name];

  return (
    <div>

      <div className={`form_item ${props.classModifier ? props.classModifier : ''}`}>
        <label className="form_item__label">{props.label}</label>

        <DatePicker
          format="dd.MM.yy"
          selected={setStartHandler}
          value={startDate}
          allowClear={props.allowClear ? props.allowClear : false}
          disableCalendar={props.elementProps && props.elementProps.disableCalendar || false}
          onChange={onChangeHandler}
          isClearable
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

export default InputDate;
