import React, {useState, useContext} from "react";
import HeaderUserProfileDropMenu from "./HeaderUserProfileDropMenu";
import {AuthContext} from "@packages/porabote";

const HeaderUserProfile = () => {

  const [isMenuOpen, toggleMenu] = useState(false);
  const {isAuth, user} = useContext(AuthContext);

  if (!isAuth) {
    return 'no auth';
  }

  const openPanel = (event: React.MouseEvent<HTMLDivElement>) => {
    const isOpen = isMenuOpen ? false : true;
    toggleMenu(isOpen);
  }

  return (
    <div
      className="header-widget_profile"
      onClick={openPanel}
      onMouseLeave={(e) => {
        toggleMenu(false);
      }}>

      <div className="header-widget_profile__info">
        <span>{user.name}</span>
        <span className="header-widget_profile__info__alias">
          {user.account_alias}
        </span>
      </div>

      <div className="header-widget_profile__photo" style={{backgroundImage: `url(${user.avatar ? user.avatar : ''})`}}>
      </div>

      <HeaderUserProfileDropMenu isMenuOpen={isMenuOpen}/>

    </div>
  );
};

export default HeaderUserProfile;
