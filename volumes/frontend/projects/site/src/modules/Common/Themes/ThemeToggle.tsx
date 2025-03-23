import React, {useContext} from "react";
import {DARK_THEME, LIGHT_THEME} from "./types";
import {ThemeContext} from "./theme-wrapper";
import {Field, Select} from "../form";

function ToggleTheme() {
  const { theme, applyTheme } = useContext(ThemeContext);

  const toggle = (newValue) => {
    applyTheme(newValue);
  }

  return (
    <div className="landing-header__toggle-theme">
      <Field>
        <Select
          inputElement="div"
          data={[{name: 'dark', id: DARK_THEME}, {name: 'light', id: LIGHT_THEME}]}
          onSelect={(e, params) => {
            toggle(params.newValue);
          }}
          isEmpty={false}
          value={theme}
          name="lang_id">
        </Select>
      </Field>
    </div>
  )
}

export default ToggleTheme;