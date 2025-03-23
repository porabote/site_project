import {useState} from "react";
import {SettingsPropsType} from "./Types";
import SettingsContext from "./SettingsContext";
import settingService from "./SettingsService";

const SettingsContainer = (props: SettingsPropsType) => {

  const [lang, setLang] = useState(localStorage.getItem('lang') || 'ru');
  const [theme, setTheme] = useState(settingService.getDefaultTheme())

  const setLangContext = (value: string): void => {
    setLang(value);
    localStorage.setItem('lang', value);
  }

  const applyTheme = (newTheme: string) => {console.log(newTheme);
    setTheme(newTheme);
    localStorage.setItem('landing_theme', newTheme);
  }

  return(
    <SettingsContext.Provider value={{
      lang,
      setLang: setLangContext,
      theme,
      applyTheme,
    }}>
      {props.children}
    </SettingsContext.Provider>
  );

};

export default SettingsContainer;