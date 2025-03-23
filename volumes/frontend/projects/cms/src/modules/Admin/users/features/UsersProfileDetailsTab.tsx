import React, {useContext} from 'react';
import {Cell, Row, Table} from "@porabote/ui/Table";
import moment from "moment";
import Icon, {EditIcon} from "@porabote/ui/Icons";
import Add from "../modals/AddModal";
import {ModalContext} from "@porabote/widgets/ModalWidget";
import ChangePassword from "../modals/ChangePasswordModal";
import {SettingsContext} from "@porabote/middlewares/Settings";

const UsersProfileDetailsTab = (props) => {

  const {data} = props;
  const {openModal} = useContext(ModalContext);
  const {lang} = useContext(SettingsContext);

  const roles = {
    new: 'Новый', invited: 'Приглашен', external: 'Внешний', active: 'Активен', fired: 'Уволен'
  };

  const openEditDialog = () => {
    openModal(<Add title="Редактировать данные пользователя" data={data}/>);
  }

  const openChangePasswordDialog = () => {
    openModal(<ChangePassword title={`Изменить пароль для ${data.surname} ${data.name}`} data={data}/>);
  }

  return (
    <div>

      <Table gridTemplateColumns="200px 1fr" class="feed striped">

        <Row>
          <Cell>ID</Cell>
          <Cell>{data.id}</Cell>
        </Row>
        <Row>
          <Cell>Имя</Cell>
          <Cell>{data.first_name}</Cell>
        </Row>
        <Row>
          <Cell>Фамилия</Cell>
          <Cell>{data.sur_name}</Cell>
        </Row>
        <Row>
          <Cell>Отчество</Cell>
          <Cell>{data.middle_name}</Cell>
        </Row>
        <Row>
          <Cell>Телефон</Cell>
          <Cell>{data.phone}</Cell>
        </Row>
        <Row>
          <Cell>Email</Cell>
          <Cell>{data.email}</Cell>
        </Row>
        <Row>
          <Cell>Должность</Cell>
          <Cell>{data.post_name}</Cell>
        </Row>
        <Row>
          <Cell>Статус</Cell>
          <Cell>{roles[data.status]}</Cell>
        </Row>
        <Row>
          <Cell>Суперпользователь</Cell>
          <Cell>{data.is_su ? 'Да' : 'Нет'}</Cell>
        </Row>
        <Row>
          <Cell>Регистрация</Cell>
          <Cell>{moment(data.created_at).format("DD-MM-YYYY HH:mm")}</Cell>
        </Row>
        <Row>
          <Cell>Последнее обновление</Cell>
          <Cell>{moment(data.updated_at).format("DD-MM-YYYY HH:mm")}</Cell>
        </Row>
      </Table>

      <div className="links_with_icon__wrap" style={{justifyContent: 'space-between'}}>

        <div
          className="link_with_icon"
          onClick={openChangePasswordDialog}
        >
          <Icon size={16} fillHover="#E6008A">
            <EditIcon className="link_with_icon__icon"/>
          </Icon>
          Изменить пароль
        </div>

        <div
          className="link_with_icon"
          onClick={openEditDialog}
        >
          <Icon size={16} fillHover="#E6008A">
            <EditIcon className="link_with_icon__icon"/>
          </Icon>
          Редактировать данные
        </div>

      </div>

    </div>
  );
};

export default UsersProfileDetailsTab;