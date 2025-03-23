import React, {useState, useEffect} from 'react';
import {useParams} from "react-router";
import {Tab, TabList, TabPanel, Tabs} from "@porabote/ui/Tabs";
import Icon from "@porabote/ui/Icons";
import BackIcon from "@porabote/ui/Icons/RecordPage/BackIcon";
import {useNavigate} from "react-router-dom";
import DetailsPage from "./UsersProfileDetailsTab";
import UsersProfileAccessTab from "./UsersProfileAccessTab";
import AccountsPage from "./UsersProfileAccountsTab";
import {Api} from "@porabote";
import UsersProfileInvitationsTab from "@/modules/Admin/users/features/UsersProfileInvitationsTab";

const UsersProfile = () => {

  const [record, setRecord] = useState(null);

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const req = await Api(`/users/get/${id}`)
      .setData({relations: ['accounts', 'aro.permissions']})
      .get();
    setRecord(req.response.data);
  }

  if (!record) {
    return <div>Загрузка...</div>;
  }

  const baskToList = () => {
    navigate("/admin/users-feed/");
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
        {record.sur_name} {record.first_name}
      </div>

      <Tabs>
        <TabList>
          <Tab>Данные</Tab>
          <Tab>Права доступа</Tab>
          <Tab>Аккаунты</Tab>
          <Tab>Приглашения</Tab>
        </TabList>

        <TabPanel>
          <DetailsPage data={record}/>
        </TabPanel>
        <TabPanel>
          <UsersProfileAccessTab data={record}/>
        </TabPanel>
        <TabPanel>
          <AccountsPage data={record}/>
        </TabPanel>
        <TabPanel>
          <UsersProfileInvitationsTab data={record}/>
        </TabPanel>

      </Tabs>

    </div>
  );
};

export default UsersProfile;