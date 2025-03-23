import React, {useContext} from 'react';
import Icon, {PlusIcon, CloseIcon} from "@porabote/ui/Icons";
import AttachUsersModal from "../modals/AttachUsersModal";
import {ModalContext} from "@porabote/widgets/ModalWidget";
import {Cell, Row, Table} from "@porabote/ui/Table";
import Api from "@porabote/api";

const ShiftsViewUsersListTab = (props) => {

  const {openModal, pushBalloon} = useContext(ModalContext);
  const {data} = props;

  const openAttachUsersModal = () => {
    openModal(<AttachUsersModal fetchData={props.fetchData} title="Редактировать данные" data={data}/>);
  }

  const detachUser = async (user_id) => {

    const req = await Api(`/access-lists/action/detachUser`).setData({access_list_id: props.data.id, user_id}).post();

    if (req.getApiError()) {
      pushBalloon(req.getApiError());
      return;
    } else {
      pushBalloon('Пользователь откреплён');
      props.fetchData({dropData: true});
    }
  }

  return (
    <div>
      <div className="links_with_icon__wrap" style={{justifyContent: 'space-between'}}>
        <div
          className="link_with_icon"
          onClick={openAttachUsersModal}
        >
          <Icon size={16} fillHover="#E6008A">
            <PlusIcon className="link_with_icon__icon"/>
          </Icon>
          Прикрепить пользователя
        </div>
      </div>

      <div>
        <Table gridTemplateColumns="1fr 60px" class="feed striped">

          <Row>
            <Cell>ФИО</Cell>
            <Cell></Cell>
          </Row>

          {data.users.map((record, index) => {
            return (
              <Row key={index}>
                <Cell>{record.sur_name} {record.first_name} ({record.post_name})</Cell>
                <Cell>
                  <div className="link_with_icon" onClick={() => detachUser(record.id)}>
                    <Icon size={10} fillHover="#E6008A">
                      <CloseIcon className="link_with_icon__icon"/>
                    </Icon>
                  </div>
                </Cell>
              </Row>
            );
          })}
        </Table>


      </div>

    </div>
  );
};

export default ShiftsViewUsersListTab;