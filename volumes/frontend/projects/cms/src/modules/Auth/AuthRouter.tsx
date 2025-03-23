import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {AuthContext} from "@packages/porabote";
import SignUpForm from "@/modules/Auth/features/RegistrationForm";
import AccountsPage from "./pages/AccountsPage";
import LoginPage from "./pages/LoginPage";
import {LOGIN_ACTION} from "./AuthConstants";
import ForgotPasswordPage from "@/modules/Auth/pages/ForgotPasswordPage";
import Porabote404Leyout from "@packages/porabote/src/layouts/Porabote404Leyout/Porabote404Leyout";
import ResetPasswordPage from "@/modules/Auth/pages/ResetPasswordPage";
import AuthRoute from "@porabote/middlewares/Auth/AuthRoute";
import MakeInvitationPage from "@/modules/Auth/pages/MakeInvitationPage";
import AcceptInvitationPage from "@/modules/Auth/pages/AcceptInvitationPage";

const AuthRouter = () => {

  const params = useParams();
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);

  const logoutHandler = () => {
    logout(() => navigate(LOGIN_ACTION));
  }

  if (params.action == 'login') {
    return React.createElement(LoginPage);
  } else if (params.action == 'signUp') {
    return React.createElement(SignUpForm);
  } else if (params.action == 'accounts') {
      return <AccountsPage/>;
  } else if (params.action == 'forgot-password') {
    return React.createElement(ForgotPasswordPage);
  } else if (params.action == 'reset-password') {
    return <ResetPasswordPage/>;
  } else if (params.action == 'make-invitation') {
    return <MakeInvitationPage/>;
  } else if (params.action == 'accept-invitation') {
    return <AcceptInvitationPage/>;
  }

  return React.createElement(Porabote404Leyout);
};

export default AuthRouter;