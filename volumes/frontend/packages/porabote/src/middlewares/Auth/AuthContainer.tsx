import React, {useEffect, useState} from 'react';
import AuthContext from "./AuthContext";
import {loginHandler, getTokenData, signUpHandler, getToken, removeTokenToLocalStorage} from "./AuthService";
import JwtHandler from "@packages/porabote/src/helpers/JwtHelper";
import {AuthPropsType, AuthType, LoginFormData} from "./Types";
import {Api} from "@porabote";
import {ResponseType} from "@porabote/api/ApiTypes";

const AuthContainer = (props: AuthPropsType) => {

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthInited, setIsAuthInited] = useState(false);
  const [accessList, setAccessList] = useState(new Set([0]));
  const [isAccessListInited, setIsAccessListInited] = useState(false);

  useEffect(() => {
    setAuth();
  }, [isAuth]);

  useEffect(() => {
    if (user?.account_id) {
      getAccessList();
    }
  }, [user])

  const getAccessList = async () => {

    if (isAccessListInited || !isAuth) {
      return;
    }

    setIsAccessListInited(true);
    Api('/access-lists/action/getPermissions/')
        .onSuccess((resp) => {
          setAccessList(new Set([...resp.data]));
        })
        .get();
  }

  const setAuth = () => {
    let authData = getTokenData();
    if (authData) {
      setUser(authData);
      setIsAuth(true);
    }

    setIsAuthInited(true);
  }

  const signUp = async (values: any, callback?: Function) => {
    signUpHandler(values, callback);
  }

  const login = (values: LoginFormData, callbackSuccess: Function, callbackError: Function) => {
    let successCallback = () => {
      setIsAuth(true);
      callbackSuccess();
    }
    loginHandler(values, successCallback, callbackError);
  }

  const setAccessListHangle = (data: number[]) => {
    setAccessList(new Set([...data]))
  }

  const refreshAuthData = () => {

    const accessToken = getToken();

    const userData = JwtHandler.parsePayload(accessToken);
    setUser(userData);
    setIsAuth(true);

    return userData;

  }

  const logout = (callback: Function) => {
    removeTokenToLocalStorage();
    setIsAuth(false);
    setUser(null);

    if (typeof callback == "function") {
      callback();
    }
  }


  const value: AuthType = {
    user,
    isAuth,
    login,
    logout,
    signUp,
    isAuthInited,
    accessList,
    setAccessList: setAccessListHangle,
    refreshAuthData,
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContainer;