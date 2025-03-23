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
}

export type AuthType = {
  isAuth: boolean;
  access_token: string | null;
  user: AuthUserType;
};