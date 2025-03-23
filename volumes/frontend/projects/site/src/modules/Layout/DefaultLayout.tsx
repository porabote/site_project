import React, {useContext} from "react";
import {Outlet} from "react-router-dom";
import {Helmet} from 'react-helmet';
import "@/resources/styles/style.less";

const DefaultLayout = () => {

  // const {theme} = useContext(ThemeContext);

  return <Outlet/>;
};

export default DefaultLayout;
