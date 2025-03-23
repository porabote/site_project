import React, {createElement, FC} from "react";
import {FieldType} from "../FormTypes";
import Input from "../Input/Input";
import Select from "../Select/Select";
import InputMask from "../Input/InputMask";
import Checkbox from "../Checkbox/Checkbox";
import InputDate from "../Input/InputDate";
import {InputDateTime, TextArea} from "../index";
import TextEditor from "../TextEditor";

class FormSchemaField {

  component: FC;
  props;

  init = (props: FieldType) => {

    props.placeholder = props.placeholder ? props.placeholder[props.lang] : "";
    props.label = props.label ? props.label[props.lang] : "";

    this.props = props;
    this.createComponent();

    return this;
  }

  createComponent = () => {
    if (this.props.component == "input") {
      this.component = createElement(Input, this.props);
    } else if (this.props.component == "inputMask") {
      this.component = createElement(InputMask, this.props);
    } else if (this.props.component == "select") {
      this.component = createElement(Select, this.props);
    } else if (this.props.component == "checkbox") {
      this.component = createElement(Checkbox, this.props);
    } else if (this.props.component == "input-date") {
      this.component = createElement(InputDate, Object.assign({disableCalendar: true}, {...this.props}));
    }  else if (this.props.component == "input-datetime") {
      this.component = createElement(InputDateTime, this.props);
    } else if (this.props.component == "textarea") {
      this.component = createElement(TextArea, this.props);
    } else if (this.props.component == "texteditor" || this.props.component == "text-editor") {
      this.component = createElement(TextEditor, this.props);
    }
  }

  setProp = (propName, value) => {
    const newProp = {};
    newProp[propName] = value;
    this.props = Object.assign({...this.props}, newProp);
    this.createComponent();
  }

  render = () => {
    return this.component;
  }

}

export default FormSchemaField;