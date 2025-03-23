import React from 'react';
import {useParams} from "react-router";
import ObjectsFeedPage from "@/modules/Objects/pages/FeedPage";
import Porabote404Leyout from "@porabote/layouts/Porabote404Leyout/Porabote404Leyout";

const ObjectsRouter = () => {

  const params = useParams();

  if (params.action == 'feed') {
    return <ObjectsFeedPage/>;
  }

  return React.createElement(Porabote404Leyout);
};

export default ObjectsRouter;