import React from "react";
import {FieldType} from "../FormTypes";
import Button from "../Button/Button";
import {createElement} from "react";
import FormSchemaField from "./FormSchemaField";

const LANG_DEFAULT = "ru";

class FormSchema {

  public lang = LANG_DEFAULT;
  private fields: FormSchemaField[] = {};
  private submit: Function;
  private changeCallback: Function = () => {};
  private buttons: FieldType<any>[] = [];
  private initialValues = {};

  getField = (fieldName) => {
    return this.fields[fieldName];
  }

  getFields = () => {
    return Object.keys(this.fields).map(fieldName => this.fields[fieldName]);
  }

  getButtons = () => {
    return this.buttons;
  }

  setInitialValues = (initialValues) => {
    this.initialValues = initialValues;
  }

  getInitialValues = () => {
    return this.initialValues;
  }

  setField = (fieldParams: FieldType<any>) => {
    this.fields[fieldParams.name] = (new FormSchemaField().init({
      ...fieldParams,
      lang: this.lang,
      key: fieldParams.name
    }));
    return this;
  }

  setButtons = (buttons: FieldType<any>[]) => {

    buttons.forEach(buttonProps => {

      this.buttons = [];

      buttonProps.placeholder = buttonProps.placeholder ? buttonProps.placeholder[this.lang] : "";
      buttonProps.label = buttonProps.label ? buttonProps.label[this.lang] : "";

      this.buttons.push(createElement(Button, {...buttonProps, key: buttonProps.name}));
    })
    return this;
  }

  setLang = (lang: string) => {
    this.lang = lang;
    return this;
  }

  setSubmit = (subminHandler) => {
    this.submit = subminHandler;
    return this;
  }

  setChangeValueCallback = (changeCallback: Function) => {
    if (typeof changeCallback == "function") {
      this.changeCallback = changeCallback;
    }
    return this;
  }

}

export default FormSchema;