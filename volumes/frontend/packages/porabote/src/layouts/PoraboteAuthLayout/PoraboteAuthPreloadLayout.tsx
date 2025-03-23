import React, {useContext} from 'react';
import {SettingsContext} from "@packages/porabote";
import ModalWidget from "../../widgets/ModalWidget";
import "../PoraboteLayout/PoraboteLayout.less";
import "./PoraboteAuthLayout.less";

const PoraboteAuthPreloadLayout = () => {

  const {theme} = useContext(SettingsContext);

  return (
    <div className={`main ${theme}`}>

      <div className="main-section">
        Авторизация
      </div>

      <ModalWidget/>

    </div>
  );
};

export default PoraboteAuthPreloadLayout;