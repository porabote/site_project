import React, {useContext} from 'react';
import moment from 'moment';
import {Cell, Row, Table} from "@porabote/ui/Table";
import {AuthContext, ModalContext} from "@porabote";
import {Button} from "@porabote/ui/Form";
import {AcceptListType, StepRecordType} from "@/modules/common/AcceptList/types";

const AcceptListSignProcess = (props: AcceptListType) => {

  const {data, isEditAccess, declineHandler} = props;
console.log(data);
  const {modal} = useContext(ModalContext);
  const {user} = useContext(AuthContext);

  let i = 0;

  const openDeclineDialog = (step: StepRecordType) => {
    declineHandler({step, closeModal: modal.close});
  }

  return (
    <div>
      <div style={{maxWidth: '1100px', margin: '0 auto'}}>

        <h3 style={{marginBottom: '40px'}}>Подписной лист</h3>

        <Table class="feed striped" gridTemplateColumns="50px 1fr 160px 160px 160px">
          <Row>
            <Cell></Cell>
            <Cell>Подписант</Cell>
            <Cell>Подписано</Cell>
            <Cell>Тип сотрудника</Cell>
            <Cell></Cell>
          </Row>
          {data.map((step: StepRecordType, index: number) => {
            i++;

            let isCanAccept = (step.user_id == user.id) ? true : false;

            return (
              <Row key={index}>
                <Cell>{i}</Cell>
                <Cell>11
                  {step.user ? `${step.user?.sur_name} ${step.user?.first_name} - ${step.user?.post_name}` : null}
                  {step.is_outside ? step.email : null}
                </Cell>
                <Cell>
                  {step.accepted_at ? moment(step.accepted_at).format('DD/MM/YY HH:mm') : ''}
                </Cell>
                <Cell>{step.is_outside ? 'Внешний' : 'Внутренний'}</Cell>
                <Cell>
                  <>
                    {isEditAccess && !step.accepted_at && step.is_outside ?
                      <Button label="Согласовано" onClick={() => props.acceptForPersonHandler(step)}/> : null
                    }
                    {isCanAccept && !step.accepted_at &&
                        <Button label="Отклонить" onClick={() => openDeclineDialog(step)}/>
                    }
                    {isCanAccept && !step.accepted_at &&
                        <Button label="Подписать" onClick={() => props.acceptHandler(step)}/>
                    }
                  </>
                </Cell>
              </Row>
          );
          })}
          </Table>

            {/*<div className="buttons-panel" style={{justifyContent: 'flex-end', margin: '40px 0'}}>*/
            }
            {/*    <Button onClick={saveList} style={{width: '200px'}} label="Отправить на подпись"/>*/
            }
            {/*</div>*/
            }

          </div>

          </div>
          )
            ;
          };

            export default AcceptListSignProcess;