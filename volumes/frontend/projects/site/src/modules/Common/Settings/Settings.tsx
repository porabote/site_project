import React, {createContext, useState} from 'react';

type SettingsPropsType = {
  children: React.ReactNode;
};

type SettingsContextType = {
  lang: string;
  setLang: Function;//React.Dispatch<React.SetStateAction<string>>;
}

const initialValues: SettingsContextType | null = {
  lang: localStorage.getItem('lang') || 'ru',
  setLang: (): void => {console.log(99);},
};

export const SettingsContext = createContext(initialValues);

const Settings = (props: SettingsPropsType) => {

  const [lang, setLang] = useState(localStorage.getItem('lang') || 'ru');

  const setLangContext = (value: string): void => {
    setLang(value);
    localStorage.setItem('lang', value);
  }

  return(
    <SettingsContext.Provider value={{
      lang,
      setLang: setLangContext,
    }}>
      {props.children}
    </SettingsContext.Provider>
  );

};

export default Settings;