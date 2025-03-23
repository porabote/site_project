import React, {useContext} from 'react';
import {useRouteError} from "react-router-dom";
// import {ThemeContext} from "@/components/Common/Themes";
// import {SettingsContext} from "@/components/Common/Settings";
import {ErrorResponseType} from "@/router/Router/Types";

const RouteErrorPage = () => {

  // const {lang, setLang} = useContext(SettingsContext);
  // const {theme} = useContext(ThemeContext);
  let theme = "white";

  const error: ErrorResponseType | unknown = useRouteError();

  // const switchLang = () => {
  //   setLang(lang == "ru" ? 'en' : 'ru');
  // }

  return (
    <div className={`main-auth ${theme}`}>

      <div style={{textAlign: 'right', padding: '10px 40px'}}>
        {/*{lang == "ru" && <a href="#" onClick={switchLang}>English</a>}*/}
        {/*{lang == "en" && <a href="#" onClick={switchLang}>Рyсский</a>}*/}
      </div>
      <div className="error-page">
        <h1>Oops! 404!</h1>
        <p>Извините, страницы не существует или у вас не хватает прав.</p>

        <p>
          <i>{error && error.statusText || error && error.message}</i>
        </p>

      </div>
    </div>
  );
};

export default RouteErrorPage;