import {createContext} from "react";
import {SettingsContextType} from "./Types";
import {LIGHT_THEME} from "./SettingsConstants";

const initialValues: SettingsContextType | null = {
  lang: localStorage.getItem('lang') || 'ru',
  setLang: Function,
  theme: LIGHT_THEME,
  applyTheme: (newTheme: string) => {},
};

export default createContext(initialValues);