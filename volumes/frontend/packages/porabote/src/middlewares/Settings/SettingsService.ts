import {LIGHT_THEME} from "./SettingsConstants";

const SettingsService = () => {

  const getDefaultTheme = () => {
    let defaultTheme: string = localStorage.getItem('landing_theme');
    if (!defaultTheme) {
      defaultTheme = LIGHT_THEME;
    }
    return defaultTheme;
  }

  return {
    getDefaultTheme,
  };
}

export default SettingsService();