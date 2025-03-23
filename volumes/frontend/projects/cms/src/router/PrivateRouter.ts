import React, {ReactNode, useContext} from 'react';
import {AuthContext} from "@porabote/middlewares/Auth";
import {useNavigate} from "react-router-dom";
import PoraboteAuthPreloadLayout from "@porabote/layouts/PoraboteAuthLayout/PoraboteAuthPreloadLayout";

type Props = {
  children: ReactNode
}

const PrivateRouter = ({children}: Props) => {

  const {isAuth, isAuthInited} = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isAuthInited) {
    return React.createElement(PoraboteAuthPreloadLayout);
  }

  if (isAuth) {
    return children;
  } else {
    navigate('/auth/login');
  }
};

export default PrivateRouter;