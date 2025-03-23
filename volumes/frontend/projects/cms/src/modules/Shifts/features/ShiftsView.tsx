import React, {useState, useEffect} from 'react';
import {useParams} from "react-router";
import {Tab, TabList, TabPanel, Tabs} from "@porabote/ui/Tabs";
import Icon from "@porabote/ui/Icons";
import BackIcon from "@porabote/ui/Icons/RecordPage/BackIcon";
import {useNavigate} from "react-router-dom";
import {Api} from "@porabote";
import ShiftsViewDetailsTab from "@/modules/Shifts/features/ShiftsViewDetailsTab";
import ShiftsViewCalendarTab from "@/modules/Shifts/features/ShiftsViewCalendarTab";
import ShiftsViewUsersListTab from "@/modules/Shifts/features/ShiftsViewUsersListTab";

const ShiftsView = (props) => {

  const [record, setRecord] = useState(null);

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const req = await Api(`/shifts/get/${id}`)
      .setData({relations: ['users', 'head_user']})
      .get();
    setRecord(req.response.data);
  }

  if (!record) {
    return <div>Загрузка...</div>;
  }

  const baskToList = () => {
    navigate("/shifts/feed/");
  }

  return (
    <div className="content" style={{padding: "40px"}}>

      <div className="record-page_top-bar">
        <div className="record-page_top-bar_icon" onClick={baskToList}>
          <Icon size={16} fill="#444">
            <BackIcon/>
          </Icon>
          назад
        </div>
        Вахта {record.name}
      </div>

      <Tabs {...props}>

        <TabList>
          <Tab>Данные</Tab>
          <Tab>Календарь</Tab>
          <Tab>Сотрудники</Tab>
        </TabList>

        <TabPanel>
          <ShiftsViewDetailsTab fetchData={fetchData} data={record}/>
        </TabPanel>
        <TabPanel>
          <ShiftsViewCalendarTab data={record}/>
        </TabPanel>
        <TabPanel>
          <ShiftsViewUsersListTab fetchData={fetchData} data={record}/>
        </TabPanel>

      </Tabs>

    </div>
  );
}

export default ShiftsView;