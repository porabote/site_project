import * as React from "react";
import {NavLink} from "react-router-dom";
import GroupIcon from "@packages/porabote/src/ui/Icons/base/GroupIcon";
import Icon from "@packages/porabote/src/ui/Icons";

const HeaderIconsBar = () => {

  return (
    <div className="header-widget_iconsbar">
      <NavLink to="/users/contacts/">
        <Icon size={24} className="header-widget_iconsbar__contacts"  fill={`#FFFFFF`} fillHover={`#FFFFFF`}>
          <GroupIcon/>
        </Icon>
      </NavLink>
    </div>
  );
};

export default HeaderIconsBar;
