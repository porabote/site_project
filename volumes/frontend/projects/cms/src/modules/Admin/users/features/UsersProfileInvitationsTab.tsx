import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Cell, Row, Table} from "@porabote/ui/Table";
import moment from "moment";
import Icon, {PlusIcon} from "@porabote/ui/Icons";
import {ModalContext} from "@porabote/widgets/ModalWidget";
import {SettingsContext} from "@porabote/middlewares/Settings";
import {Api} from "@porabote";

const UsersProfileInvitationsTab = () => {

  const {id} = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const createInvitation = async () => {
    const req = await Api(`/users-invitations/action/makeInvitation/`)
      .setData({user_id: id})
      .post();

    fetchData();
  }

  const fetchData = async () => {
    const req = await Api(`/users-invitations/get/${id}`)
      .setData({user_id: id})
      .post();

    setData(req.response.data);
  }

  return (
    <div>

      <div className="links_with_icon__wrap" style={{justifyContent: 'flex-end'}}>

        <div className="link_with_icon" onClick={createInvitation}>
          <Icon size={16} fillHover="#E6008A">
            <PlusIcon className="link_with_icon__icon"/>
          </Icon>
          Создать приглашение
        </div>

      </div>

      <Table gridTemplateColumns="200px 1fr 300px 300px" class="feed striped">

        <Row>
          <Cell>Отправитель</Cell>
          <Cell>Ссылка</Cell>
          <Cell>Токен использован/просрочен</Cell>
          <Cell>Создан</Cell>
        </Row>

        {data.map((record, index) => {
          return <Row key={index}>
            <Cell>{record.id}</Cell>
            <Cell>{`https://th.porabote.ru/auth/accept-invitation/${record.code}`}</Cell>
            <Cell>
              <>
              {record.activated_at ? 'Да' : 'Нет'}/
              {moment().isAfter(moment(record.created_at).add(1, 'hours')) ? 'Да' : 'Нет'}
              </>
            </Cell>
            <Cell>{moment(record.created_at).format("MMMM DD YYYY, h:mm")}</Cell>
          </Row>;
        })}

      </Table>

    </div>
  );
};

export default UsersProfileInvitationsTab;