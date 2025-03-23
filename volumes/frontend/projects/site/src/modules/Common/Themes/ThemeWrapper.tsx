import React, {createContext, useState} from 'react';
import {DARK_THEME, LIGHT_THEME} from "./types";

type PropsType = {
  children: React.ReactNode;
};

export const ThemeContext = createContext({
  theme: LIGHT_THEME,
  applyTheme: (newTheme: string) => {
  },
});

const ThemeWrapper = (props: PropsType) => {

  let defaultTheme = localStorage.getItem('landing_theme');
  if (!defaultTheme) {
    defaultTheme = LIGHT_THEME;
  }

  const [theme, setTheme] = useState(defaultTheme)

  const applyTheme = (newTheme: string) => {console.log(newTheme);
    setTheme(newTheme);
    localStorage.setItem('landing_theme', newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, applyTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;