import React, {useContext} from "react";
import {NavsContext} from "@packages/porabote";
import NavbarItem from "./HeaderNavsItem";

export type HeaderNavsItemType = {
  id: number;
  name_ru: string;
  name_en: string;
  link: string;
  parent_id: null | number;
  children?: any[];
};

const HeaderNavs = () => {

  let {data}: { data: HeaderNavsItemType[] } = useContext(NavsContext);

  return (
    <div className="header-widget-navs">
      {data.map((nav, index) => {
        return <NavbarItem key={index} data={nav}/>
      })}
    </div>
  )

}

export default HeaderNavs