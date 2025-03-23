import {createContext} from 'react';
import {AuthType} from "./Types";

const initialAuth: AuthType = {
  user: null,
  isAuth: false,
  access_token: null,
  isAuthInited: false,
  login: Function,
  logout: Function,
  signUp: Function,
  refreshAuthData: Function,
  changeAccount: Function,
};

export default createContext(initialAuth);