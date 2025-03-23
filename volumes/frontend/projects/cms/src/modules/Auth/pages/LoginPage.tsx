import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import LoginForm from "@/modules/Auth/features/LoginForm";
import {SettingsContext} from "@packages/porabote";

const LoginPage = () => {

  const {lang, setLang} = useContext(SettingsContext);

  return (
    <div className="box login_block" style={{width: '320px', margin: '0 auto'}}>
      <div className="box-body">

        <LoginForm/>

        <div
          style={{
            padding: "15px 0",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            alignContent: "flex-end"
          }}>
          {/*<NavLink to={"/auth/signUp"}>*/}
          {/*  {lang == "ru" && "Регистрация"}*/}
          {/*  {lang == "en" && "Sign up"}*/}
          {/*</NavLink>*/}
          <NavLink to={"/auth/forgot-password"}>
            {lang == "ru" && "Забыл пароль"}
            {lang == "en" && "Forgot password"}
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;