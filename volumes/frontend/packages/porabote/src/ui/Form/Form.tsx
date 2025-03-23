import React, {useEffect, useState} from 'react';
import {FormContextType, FormType} from "./FormTypes";
import ObjectMapper from "@packages/porabote/src/helpers/ObjectMapperHelper";
import Validation from "./validation";
import FormContext from "./FormContext";

const Form = ({
                initValues,
                children,
                onSubmit,
                schema,
                method = "POST"
              }: FormType) => {

  if (!initValues) {
    initValues = schema.getInitialValues();
  }
  const [values, setValues] = useState(initValues);
  const [validationErrors, setValidationError] = useState({});
  //const [formKey, setFormKey] = useState(0);

  if (!onSubmit) {
    onSubmit = schema.submit;
  }

  useEffect(() => {
  }, []);

  const onSubmitHandler = (context: FormContextType) => {

    const errors = Validation(context).validate();
    if (Object.keys(errors).length) {
      return;
    }

    if (onSubmit) {
      onSubmit(context);
    }
  }

  const setValidationErrorHandler = (errors) => {
    setValidationError(errors);
  }

  const setValue = (name: string, value: any, mode: string = 'merge'): void => {
    let newValues = ObjectMapper.setValue(name, value, values, mode);
    setValues(newValues);
    schema.changeCallback({newValue: value, values, name});
  }

  const getValue = (name: string) => {
    return ObjectMapper.get(name, values);
  }

  const initFormContextValues = {
    values,
    getValue,
    setValue,
    onSubmit: onSubmitHandler,
    schema,
    validationErrors,
    setValidationError: setValidationErrorHandler,
  }

  return (
    <FormContext.Provider value={initFormContextValues}>
      <>
        {children}
      </>
    </FormContext.Provider>
  );

}

export default Form;
