import React from 'react';
import {useParams} from "react-router";
import Porabote404Leyout from "@porabote/layouts/Porabote404Leyout/Porabote404Leyout";
import ShiftsFeedPage from "@/modules/Shifts/pages/ShiftsFeedPage";
import ShiftsViewPage from "@/modules/Shifts/pages/ShiftsViewPage";

const WorkbookRouter = () => {

  const params = useParams();

  if (params.page == 'feed') {
    return <ShiftsFeedPage/>;
  } else if (params.page == 'view') {
    return <ShiftsViewPage/>;
  }

  return React.createElement(Porabote404Leyout);
};

export default WorkbookRouter;