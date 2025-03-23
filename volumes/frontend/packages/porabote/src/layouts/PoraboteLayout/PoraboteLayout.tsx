import React, {useContext} from 'react';
import {Outlet} from "react-router-dom";
import {SettingsContext} from "@packages/porabote";
import HeaderWidget from "@packages/porabote/src/widgets/HeaderWidget";
import ModalWidget from "../../widgets/ModalWidget";
import "./PoraboteLayout.less";

const PoraboteLayout = () => {

  const {theme} = useContext(SettingsContext);

  return (
    <div className={`layout-default ${theme}`}>

      <div className="layout-default-header">
        <HeaderWidget/>
      </div>

      <div className="layout-default-outlet">
        <Outlet/>
      </div>

      <ModalWidget/>

    </div>
  );
};

export default PoraboteLayout;