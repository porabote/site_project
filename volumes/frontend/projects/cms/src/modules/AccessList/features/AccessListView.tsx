import React, {useState, useEffect} from 'react';
import {useParams} from "react-router";
import {Tab, TabList, TabPanel, Tabs} from "@porabote/ui/Tabs";
import Icon from "@porabote/ui/Icons";
import BackIcon from "@porabote/ui/Icons/RecordPage/BackIcon";
import {useNavigate} from "react-router-dom";
import DetailsPage from "./AccessListViewDetailsTab";
import UsersProfileAccessTab from "./UsersProfileAccessTab";
import AccountsPage from "./UsersProfileAccountsTab";
import {Api} from "@porabote";
import AccessListViewDetailsTab from "./AccessListViewDetailsTab";
import AccessListViewUsersListTab from "@/modules/AccessList/features/AccessListViewUsersListTab";

const AccessListView = () => {

  const [record, setRecord] = useState(null);

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const req = await Api(`/access-lists/get/${id}`)
      .setData({relations: ['users']})
      .get();
    setRecord(req.response.data);
  }

  if (!record) {
    return <div>Загрузка...</div>;
  }

  const baskToList = () => {
    navigate("/access-lists/feed/");
  }

  return (
    <div className="record-page">

      <div className="record-page_top-bar">
        <div className="record-page_top-bar_icon" onClick={baskToList}>
          <Icon size={16} fill="#444">
            <BackIcon/>
          </Icon>
          назад
        </div>
        {record.name}
      </div>

      <Tabs>
        <TabList>
          <Tab>Данные</Tab>
          <Tab>Пользователи</Tab>
        </TabList>

        <TabPanel>
          <AccessListViewDetailsTab fetchData={fetchData} data={record}/>
        </TabPanel>
        <TabPanel>
          <AccessListViewUsersListTab fetchData={fetchData} data={record}/>
        </TabPanel>
      </Tabs>

    </div>
  );
};

export default AccessListView;