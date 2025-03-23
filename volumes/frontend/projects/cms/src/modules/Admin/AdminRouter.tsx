import React from 'react';
import {useParams} from "react-router";
import Porabote404Leyout from "@packages/porabote/src/layouts/Porabote404Leyout/Porabote404Leyout";
import UsersFeedPage from "./users/pages/UsersFeedPage"
import UsersProfilePage from "@/modules/Admin/users/pages/UsersProfilePage";

const AdminRouter = () => {

  const params = useParams();

  if (params.action == 'users-feed') {
    return <UsersFeedPage/>;
  } else if (params.action == 'users-profile') {
    return <UsersProfilePage/>;
  }

  return React.createElement(Porabote404Leyout);
};

export default AdminRouter;