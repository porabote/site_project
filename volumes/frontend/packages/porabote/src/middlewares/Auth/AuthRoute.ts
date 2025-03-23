import React, {ReactNode, useContext} from 'react';
import {AuthContext} from "@packages/porabote";
import {useNavigate} from "react-router-dom";
import AuthPreloader from "./AuthPreloader";
//import AuthPreloadPage from "@/components/pages/preloading-page/auth-preload-page";

type Props = {
  children: ReactNode
}

const AuthRoute = ({children}: Props) => {

  const {isAuth, isAuthInited} = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isAuthInited) {
    // TODO preloader
    return React.createElement(AuthPreloader);
  }

  if (isAuth) {
    return children;
  } else {
    navigate('/auth/login');
  }
};

export default AuthRoute;