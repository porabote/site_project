export type AuthType = {
  isAuth: boolean;
  isAuthInited: boolean;
  access_token?: string | null;
  user: AuthUserType;
  login: Function,
  logout: Function,
  signUp: Function,
  changeAccount: Function,
  refreshAuthData: Function;
};

export type AuthUserType = {
  account_alias: string;
  avatar: string;
  exp: number;
  iat: number;
  id: number | null;
  name: string;
  post_name: string;
  role_id: number | null;
  username: string;
  accounts: AccountRecordType[];
}

export type LoginFormData = {
  username: string;
  password: string;
  account_id: number;
}

export type AuthPropsType = {
  children: React.ReactNode;
}

export type AccountRecordType = {
  id: number;
  alias: string;
}