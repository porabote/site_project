import React from 'react';
import {NavLink} from "react-router-dom";
import Logo from "@porabote/assets/svg/logo.svg";

const HeaderLogo = () => {
  return (
    <NavLink className="header-widget_logo" to={"/"}>
      <img style={{width: "110px"}} src={Logo}/>
    </NavLink>
  );
};

export default HeaderLogo;