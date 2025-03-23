import React, {useContext, useState} from 'react';
import {NavLink} from "react-router-dom";
import {SettingsContext} from "@packages/porabote";
import Icon from "@packages/porabote/src/ui/Icons";
import ArrowDownIcon from "@packages/porabote/src/ui/Icons/header-navs/arrow-down-icon";
import {HeaderNavsItemType} from "./HeaderNavs";

const HeaderNavsItem = (props: {data: HeaderNavsItemType}) => {

  const {lang} = useContext(SettingsContext);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const onMouseEnterHandler = () => {
    setDropdownVisible(true);
  }

  const onMouseLeaveHandler = () => {
    setDropdownVisible(false);
  }

  const setChildren = () => {

    if (typeof props.data.children === "undefined") return "";

    return (
      <div className={`header-widget-navs-sub ${isDropdownVisible ? 'active' : ''}`}>
        {
          props.data.children.map((nav: HeaderNavsItemType, index: number) => {
            return (
              <NavLink key={index} to={nav.link} className="header-widget-navs-sub_item">
                {nav[`name_${lang}`]}
              </NavLink>
            )
          })
        }
      </div>
    )
  }

  const nav = props.data;

  return (
    <div
      key={nav.id}
      className="header-widget-navs_item"
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}>
      <NavLink key={nav.id} className="header-widget-navs_item-link" to={nav.link}>
        {nav[`name_${lang}`]}
        {nav.children &&
          <Icon size={10}><ArrowDownIcon/></Icon>
        }
      </NavLink>
      {setChildren()}
    </div>
  );

};

export default HeaderNavsItem;