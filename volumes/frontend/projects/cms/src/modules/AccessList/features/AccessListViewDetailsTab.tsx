import React, {useContext} from 'react';
import {Cell, Row, Table} from "@porabote/ui/Table";
import Icon, {EditIcon} from "@porabote/ui/Icons";
import Add from "../modals/AccessListsAddModal";
import {ModalContext} from "@porabote/widgets/ModalWidget";
import {SettingsContext} from "@porabote/middlewares/Settings";

const AccessListViewDetailsTab = (props) => {

  const {data} = props;
  const {openModal} = useContext(ModalContext);
  const {lang} = useContext(SettingsContext);

  const openEditDialog = () => {
    openModal(<Add title="Редактировать данные" fetchData={props.fetchData} data={data}/>);
  }

  return (
    <div>

      <Table gridTemplateColumns="200px 1fr" class="feed striped">

        <Row>
          <Cell>ID</Cell>
          <Cell>{data.id}</Cell>
        </Row>
        <Row>
          <Cell>Описание</Cell>
          <Cell>{data.name}</Cell>
        </Row>
      </Table>

      <div className="links_with_icon__wrap" style={{justifyContent: 'space-between'}}>

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

export default AccessListViewDetailsTab;