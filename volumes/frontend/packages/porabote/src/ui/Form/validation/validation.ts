import React, {useContext} from 'react';
import {FormContextType} from "../types";
import {AuthContext} from "../../__auth/auth-wrapper";
import {SettingsContext} from "../../settings/settings";

const Validation = (formContext: FormContextType) => {

  const {schema, values, setValidationError, validationErrors} = formContext;

  const validate = () => {

    let errors = {...validationErrors};

    if (!schema) {
      return [];
    }

    for (let fieldName in schema.fields) {

      let lang = schema.fields[fieldName].props.lang;

      let {rules} = schema.fields[fieldName].props;
      if (!rules) {
        continue;
      }

      rules.forEach((rule) => {
        let value = values[fieldName];
        let res = checkRule(rule, value);

        if (!res) {

          if (!errors[fieldName]) {
            errors[fieldName] = {};
          }
          errors[fieldName][rule.type] = rule.prompt[lang];
        } else {
          if (errors[fieldName]) {
            delete errors[fieldName][rule.type];
          }
        }
      });
    }

    for (let fieldName in errors) {
      if (!Object.keys(errors[fieldName]).length) {
        delete errors[fieldName];
      }
    }

    setValidationError(errors);
    return errors;
  }

  const checkRule = (rule, value) => {
    if (rule.type == 'required') {
      return _isRequired(value);
    }
  }

  const _isRequired = (value) => {
    if (!value || (typeof value == "string" && !value.length)) {
      return false;
    }
    return true;
  }

  return {
    validate
  };
};

export default Validation;