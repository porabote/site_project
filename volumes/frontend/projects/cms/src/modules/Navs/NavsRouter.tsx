import React from 'react';
import {useParams} from "react-router";
import FeedPage from "@/modules/Navs/pages/FeedPage";
import Porabote404Leyout from "@porabote/layouts/Porabote404Leyout/Porabote404Leyout";

const NavsRouter = () => {

  const params = useParams();

  if (params.action == 'feed') {
    return <FeedPage/>;
  }

  return React.createElement(Porabote404Leyout);
};

export default NavsRouter;