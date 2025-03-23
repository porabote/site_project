import React, {CSSProperties, FocusEventHandler} from "react";
import {RecordType} from "@packages/porabote/src/api/ApiTypes";

export type FormContextType = {
  onSubmit: (context: FormContextType) => any;
  getValue: (name: string) => any;
  setValue: (name: string, value: any, mode?: string) => any;
  values: {[key: string]: any};
  schema: FormSchemaType;
  setValidationError: Function,
  validationErrors: {[key: string]: string},
};

export type FormType = {
  method?: string;
  schema: FormSchemaType;
  children: React.ReactNode[] | React.ReactNode;
  onSubmit?: (context: FormContextType) => void;
  initValues?: {[key: string]: any};
}

export interface FieldPropsType {
  children: React.ReactElement;
}

export type ButtonPropsElementType = {
  icon?: string;
  isVisible?: Function;
  setIsButtonLoading: Function;
  onSubmit: (context: FormContextType) => void;
};

export type ButtonPropsType = Omit<FieldType<ButtonPropsElementType> & {children?: React.ReactNode}, "name"> ;

type RuleType = {
  type: 'required';
  prompt: {[key: string]: string};
  handler?: Function;
  label?: string;
};

//TODO
export type FieldChildType<E> = {
  elementParams?: E;
  context?: FormContextType;
  newValue?: any;
}

export type FieldType<E> = {
  children?: React.ReactElement | React.ReactNode;
  formContext?: FormContextType;
  name?: string;
  label?: string | {[key: string]: string};
  optionValueKey?: string;
  rules?: RuleType[];
  optionsTitle?: any;
  placeholder?: string | {[key: string]: string};
  disabled?: boolean | Function;
  classModifier?: string;
  value?: any;
  isEmpty?: boolean;
  type?: string;
  class?: string;
  elementProps?: E;
  className?: string;
  style?: CSSProperties;
  status?: boolean;
  isVisible?: Function;
  component?: string;
  icon?: any;
  valueFormat?: "integer";
  data?: {[key: number | string]: any}[];
  optionTitle?: Function | string;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>, params: FieldChildType<E>) => void;
  onChange?: (e: React.FormEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>, params: FieldChildType<E>) => void;
  onInput?: (e: React.KeyboardEvent<HTMLInputElement> | string, params: FieldChildType<E>) => void;
  onSelect?: (e: React.FormEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>, params: FieldChildType<E>) => any
  onClick?: (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>, params: FieldChildType<E>) => any;
};

export type SelectType = {
  data?: {[key: number | string]: any}[];
  buttons?: [];
  children?: React.ReactElement[];
  storage?: any[];
  emptyTitle?: string;
  context?: FormContextType;
  isEmpty?: boolean;
  inputElement?: 'div' | 'input';
  isMultiple?: boolean;
  label: string;
  name: string;
  classModifier?: string;
  isTogglerHide: boolean;
  onSelect?: (mouseEvent: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLInputElement, Element>, params: {
    value?: number | string | null,
    title?: string | number,
    storage?: any[];
    storageMap?: {};
    newValue: SelectOptionValueType,
    context: FormContextType,
  }) => void;
  optionTitle?: (record: RecordType<any>) => string;
  optionValueKey?: string | number;
  options?: React.JSX.Element[] | [];
  setData?: () => { [key: string]: any; }[];
  setTagTitle?: (value: number | string, storage: any[], storageMap: {}) => string;
  value?: string | number | number[] | Set<any> | null;
}

export type SelectOptionValueType = string | number | any[] | Set<any> | null | boolean;
export type OptionType = {
  children: string | number;
  selected?: boolean;
  value: SelectOptionValueType;
  key: number | string;
  isMultiple?: boolean;
  onSelect?: (mouseEvent: React.MouseEvent<HTMLDivElement>, params: {
    newValue: SelectOptionValueType;
    title: string | number;
  }) => any;
  onSelectMultiple?: (mouseEvent: React.MouseEvent<HTMLDivElement>, params: {
    newValue: SelectOptionValueType,
    title: string | number
  }) => any;
  storage?: any[];
  storageMap?: {[key: string | number | symbol]: any};
};

export type SelectTagsProps = {
  name: string;
  storage: any[];
  storageMap: {[key: string | number | symbol]: any};
  value: Set<any>;
  context: FormContextType;
  setTagTitle?: (value: string | number, storage: any[], storageMap: {}) => string;
};

export type FormSchemaType = {
  title?: {
    ru: string;
    en: string;
  },
  button?: {
    title: {
      ru: string;
      en: string;
    },
    class: string;
  },
  initValues?: {[key: string]: any}
  getButtons?: Function;
};