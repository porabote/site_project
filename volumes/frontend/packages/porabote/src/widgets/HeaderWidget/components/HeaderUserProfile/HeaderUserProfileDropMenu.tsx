import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import LogoutIcon from "@porabote/ui/Icons/HeaderProfile/LogoutIcon";
import {AuthUserType} from "@porabote/context/auth/Types";
import Icon, {UserIcon} from "@porabote/ui/Icons";
import ProfileIcon from "@porabote/ui/Icons/HeaderProfile/ProfileIcon";
import AccessListIcon from "@porabote/ui/Icons/HeaderProfile/AccessListIcon";
import ConfigIcon from "@porabote/ui/Icons/HeaderProfile/ConfigIcon";
import {AuthContext} from "@packages/porabote";

type ProfileType = {
  isAuth: boolean;
  user: AuthUserType;
  isMenuOpen: boolean;
};

const HeaderUserProfileDropMenu = (props) => {

  const {logout, isAuth, user} = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className={props.isMenuOpen ? "header-widget_profile__dropdown open" : "header-widget_profile__dropdown"}>

      <div className="header-widget_profile__dropdown__item">
        <Icon size={18}>
          <ProfileIcon/>
        </Icon>
        <NavLink to={`/users/view/${user.id}`}>
          Профиль
        </NavLink>
      </div>


      {/*<div className="header-widget_profile__dropdown__item">*/}
      {/*  <SettingsEthernetIcon style={settingStyle}/>*/}
      {/*  <NavLink to="/business-events/feed/" className="header-widget_profile__dropdown__item__divnk profil">*/}
      {/*    Бизнес-события*/}
      {/*  </NavLink>*/}
      {/*</div>*/}

      <div className="header-widget_profile__dropdown__item">
        <Icon><AccessListIcon/></Icon>
        <NavLink to="/access-lists/feed/" className="header-widget_profile__dropdown__item__divnk profil">
          Списки доступа
        </NavLink>
      </div>

      {/*<div className="header-widget_profile__dropdown__item">*/}
      {/*  <SettingsEthernetIcon style={settingStyle}/>*/}
      {/*  <NavLink to="/mails-patterns/feed/" className="header-widget_profile__dropdown__item__divnk profil">*/}
      {/*    Шаблоны писем*/}
      {/*  </NavLink>*/}
      {/*</div>*/}


      <div className="header-widget_profile__dropdown__item">
        <Icon><ConfigIcon/></Icon>
        <NavLink to="/settings/" className="header-widget_profile__dropdown__item__divnk profil">
          Настройки
        </NavLink>
      </div>


      {!!user.is_su &&
        <div className="header-widget_profile__dropdown__item">
          <Icon size={18}>
            <ProfileIcon/>
          </Icon>
          <NavLink to="/admin/users-feed/" className="header-widget_profile__dropdown__item__divnk profil">
            Пользователи
          </NavLink>
        </div>
      }


      <div className="header-widget_profile__dropdown__separator"></div>
      <div className="header-widget_profile__dropdown__item ">
        <Icon size={18}>
          <LogoutIcon/>
        </Icon>
        <div onClick={logoutHandler} className="header-widget_profile__dropdown__item__divnk exit">
          Выйти
        </div>
      </div>
    </div>
  );
};

export default HeaderUserProfileDropMenu;
