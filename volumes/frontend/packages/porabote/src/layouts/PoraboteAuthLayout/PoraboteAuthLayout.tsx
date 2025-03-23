import React, {useContext} from 'react';
import {Outlet} from "react-router-dom";
import {SettingsContext} from "@packages/porabote";
import ModalWidget from "../../widgets/ModalWidget";
import "../PoraboteLayout/PoraboteLayout.less";
import "./PoraboteAuthLayout.less";

const PoraboteLayout = () => {

  const {theme} = useContext(SettingsContext);

  return (
    <div className={`main ${theme}`}>

      <div className="main-section">
        <Outlet/>
      </div>

      <ModalWidget/>

    </div>
  );
};

export default PoraboteLayout;