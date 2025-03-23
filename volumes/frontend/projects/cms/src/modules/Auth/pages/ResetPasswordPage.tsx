import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {SettingsContext} from "@packages/porabote";
import ResetPasswordForm from "../features/ResetPasswordForm";

const ResetPasswordPage = () => {

  const {lang, setLang} = useContext(SettingsContext);

  return (
    <div className="box login" style={{width: '360px', margin: '0 auto'}}>

      <h2 style={{padding: '40px 0 10px 0'}}>Сброс пароля</h2>

      <div className="box-body">

        <ResetPasswordForm/>

        <div
          style={{
            padding: "15px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "space-between",
            alignContent: "space-between"
          }}>
          <NavLink to={"/auth/login"}>
            {lang == "ru" && "Вход"}
            {lang == "en" && "Login"}
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default ResetPasswordPage;