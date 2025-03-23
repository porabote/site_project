import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {Api, AuthContext} from "@packages/porabote";
import {setTokenToLocalStorage} from "@porabote/middlewares/Auth/AuthService"
import {AccountRecordType} from "@packages/porabote/src/middlewares/Auth/Types";
import {LOGIN_ACTION} from "../AuthConstants";

const AccountsPage = () => {

  const {user, logout, refreshAuthData} = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <p>Загрузка списка аккаунтов</p>;
  }

  const changeAccountHandler = (accountId: number) => {

    Api("/auth/action/switchAccount")
      .onSuccess((response: {access_token: string}) => {
        setTokenToLocalStorage(response.access_token);
        refreshAuthData();
        navigate('/');
      })
      .setData({account_id: accountId})
      .post();
  }

  const logoutHandler = () => {
    const callback = () => {
      navigate(LOGIN_ACTION);
    }
    logout(callback);
  };

  let accounts = user.accounts || [];

  if (!Array.isArray(user.accounts)) {
    accounts = [];
  }

  return (
    <div className="select-account-page">
      {accounts.map((account: AccountRecordType) => {
        return (
          <div key={account.id} className="select-account-page-item"
               onClick={() => changeAccountHandler(account.id)}>{account.alias}</div>
        );
      })}
      <div key={99} className="select-account-page-item" onClick={logoutHandler}>Выйти</div>
    </div>
  );
};

export default AccountsPage;