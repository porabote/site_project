import React from 'react';
import {useParams} from "react-router";
import Porabote404Leyout from "@packages/porabote/src/layouts/Porabote404Leyout/Porabote404Leyout";
import AccessListFeedPage from "@/modules/AccessList/pages/AccessListFeedPage";
import AccessListViewPage from "@/modules/AccessList/pages/AccessListViewPage";

const AccessListRouter = () => {

  const params = useParams();

  if (params.action == 'feed') {
    return <AccessListFeedPage/>;
  } else if (params.action == 'view') {
    return <AccessListViewPage/>;
  }

  return React.createElement(Porabote404Leyout);
};

export default AccessListRouter;