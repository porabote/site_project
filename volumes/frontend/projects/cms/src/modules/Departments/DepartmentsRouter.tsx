import React from 'react';
import {useParams} from "react-router";
import DepartmentsFeedPage from "@/modules/Departments/pages/FeedPage";
import DepartmentsViewPage from "./pages/DepartmentsViewPage";
import Porabote404Leyout from "@porabote/layouts/Porabote404Leyout/Porabote404Leyout";

const DepartmentsRouter = () => {

  const params = useParams();

  if (params.action == 'feed') {
    return <DepartmentsFeedPage/>;
  } else if (params.action == 'view') {
    return <DepartmentsViewPage/>;
  }

  return React.createElement(Porabote404Leyout);
};

export default DepartmentsRouter;