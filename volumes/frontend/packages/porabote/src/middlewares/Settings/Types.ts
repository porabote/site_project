export type SettingsPropsType = {
  children: React.ReactNode;
}

export type SettingsContextType = {
  lang: 'ru' | 'en';
  setLang: Function;//React.Dispatch<React.SetStateAction<string>>;
  theme: string;
  applyTheme: Function;
}