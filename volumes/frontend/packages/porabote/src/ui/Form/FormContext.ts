import React, {createContext} from 'react';
import {FormContextType} from "./FormTypes";

const initContextValues = {
  setValue(name: string, number: number | string): void {},
  getValue: (name: string): any => {},
  values: {},
  schema: {},
  onSubmit: () => {},
  setValidationError: () => {},
  validationErrors: {},
};

const FormContext: React.Context<FormContextType> = createContext<FormContextType>(initContextValues);

export default FormContext;