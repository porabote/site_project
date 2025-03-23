import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {SettingsContext} from "@packages/porabote";
import ResetPasswordByEmailForm from "@/modules/Auth/features/ResetPasswordByEmailForm";

const ForgotPasswordPage = () => {

  const {lang, setLang} = useContext(SettingsContext);

  return (
    <div className="box login" style={{width: '360px', margin: '0 auto'}}>

      <h2 style={{padding: '40px 0 10px 0'}}>Восстановление пароля</h2>

      <div className="box-body">

        <ResetPasswordByEmailForm/>

        <div
          style={{
            padding: "15px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "space-between",
            alignContent: "space-between"
          }}>
          <NavLink to={"/auth/signUp"}>
            {lang == "ru" && "Регистрация"}
            {lang == "en" && "Sign up"}
          </NavLink>
          <NavLink to={"/auth/login"}>
            {lang == "ru" && "Вход"}
            {lang == "en" && "Login"}
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;