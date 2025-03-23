import React, {useContext} from 'react';
import {Field, Select} from "@/app/form";
import {SettingsContext} from "./settings";

const LangToggle = () => {

  let {lang, setLang} = useContext(SettingsContext);

  return (
    <div className="landing-header__lang-panel">
      <Field>
        <Select
          inputElement="div"
          data={[{name: 'ru', id: 'ru'}, {name: 'en', id: 'en'}]}
          onSelect={(e, params) => {
            setLang(params.newValue);
          }}
          isEmpty={false}
          value={lang}
          name="lang_id">
        </Select>
      </Field>
    </div>
  );
};

export default LangToggle;