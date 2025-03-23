import React from "react";
import HeaderIconsBar from "./components/HeaderIconsBar";
import HeaderUserProfile from "./components/HeaderUserProfile/HeaderUserProfile";
import HeaderLogo from "./components/HeaderLogo/HeaderLogo";
import HeaderNavs from "./components/HeaderNavs/HeaderNavs";
import "./HeaderWidget.less";

const HeaderWidget = () => {
    return (
        <div className="header-widget">
            <HeaderLogo/>
            <div className="header-widget_empty_block"></div>
            <HeaderNavs/>
            <HeaderIconsBar/>
            <HeaderUserProfile/>
        </div>
    );
}

export default HeaderWidget;
