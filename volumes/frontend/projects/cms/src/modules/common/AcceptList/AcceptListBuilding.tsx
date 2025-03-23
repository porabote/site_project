import React, {useContext} from 'react';
import {Cell, Row, Table} from "@porabote/ui/Table";
import Icon, {CloseTightIcon, EditIcon, PlusIcon} from "@porabote/ui/Icons";
import {Button} from "@porabote/ui/Form";
import {Api, ModalContext} from "@porabote";
import AddStepDialog from "./modals/AddStepDialog";
import moment from "moment";
import {AcceptListType} from "@/modules/common/AcceptList/types";

const AcceptListBuilding = (props: AcceptListType) => {

    const {data, recordId, label, updateData, saveList, isDone, isEditAccess} = props;

    const {modal} = useContext(ModalContext);

    const openAddDialog = () => {
        modal.open(<AddStepDialog updateData={updateData} recordId={recordId} label={label} title="Добавление подписанта"/>);
    }

    const deleteStep = (record) => {

        Api("/AcceptListsSteps/action/delete")
            .setData({
                id: record.id,
            })
            .onSuccess((resp) => {
                updateData();
            })
            .post();
    }

    let i = 0;

    return (
        <div>
            <div style={{maxWidth: '1100px', margin: '0 auto'}}>

                <h3 style={{marginBottom: '40px'}}>Формирование подписного листа</h3>

                <Table class="feed striped" gridTemplateColumns="50px 1fr 140px 160px 60px">
                    <Row>
                        <Cell></Cell>
                        <Cell>Подписант</Cell>
                        <Cell>Подписано</Cell>
                        <Cell>Тип</Cell>
                        <Cell>
                            <div onClick={openAddDialog}>
                                <Icon>
                                    <PlusIcon/>
                                </Icon>
                            </div>
                        </Cell>
                    </Row>
                    {data.map((step, index) => {
                        i++;
                        return (
                            <Row key={index}>
                                <Cell>{i}</Cell>
                                <Cell>
                                    {step.user ? `${step.user?.sur_name} ${step.user?.first_name} - ${step.user?.post_name}` : null}
                                    {step.is_outside ? step.email : null}
                                </Cell>
                                <Cell>{step.accepted_at ? moment(step.accepted_at).format('DD/MM/YY HH:mm') : 'Нет'}</Cell>
                                <Cell>{step.is_outside ? 'Внешний' : 'Внутренний'}</Cell>
                                <Cell>
                                    <div onClick={() => deleteStep(step)}>
                                        <Icon>
                                            <CloseTightIcon/>
                                        </Icon>
                                    </div>
                                </Cell>
                            </Row>
                        );
                    })}
                </Table>

                {!isDone && isEditAccess &&
                  <div className="buttons-panel" style={{justifyContent: 'flex-end', margin: '40px 0'}}>
                      <Button onClick={saveList} style={{width: '200px'}} label="Отправить на подпись"/>
                  </div>
                }

            </div>

        </div>
    );
};

export default AcceptListBuilding;