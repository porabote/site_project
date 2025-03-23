import React, {useState, useContext} from "react";
import {useParams} from "react-router";
import Calendar from "@porabote/widgets/CalendarWidget";
import {Api} from "@porabote";
import {ModalContext} from "@porabote/widgets/ModalWidget";

const ShiftsViewCalendarTab = (props) => {

  const {data} = props;
  const {id} = useParams();

  const {pushBalloon} = useContext(ModalContext);

  let periodsList = (typeof data.periods == "string") ? JSON.parse(data.periods) : [];

  let [periods, setPeriods] = useState((periodsList.length > 0) ? periodsList : []);

  const savePeriods = async (id: number, periods: any[], callback: Function) => {
    const req = Api(`/shifts/action/savePeriods/`)
      .setData({id, periods})
      .post();

    pushBalloon('Данные обновлены.');
    callback([...periods]);
  }

  return (
    <div className="prb-calendar-wrap">
      <Calendar
        periods={periods}
        onSelect={(periods, periodsDatetime) => {
          savePeriods(id, periodsDatetime, setPeriods);
        }}
      />
    </div>
  );
}

export default ShiftsViewCalendarTab;