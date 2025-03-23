import React, {useContext} from 'react';
import {FilesContext} from "../../Files";
import {Cell, Row, Table} from "@porabote/ui/Table";
import {FileRecordType} from "@porabote/widgets/FilesWidget/types/FilesWidgetTypes";
import Icon, {EditIcon} from "@porabote/ui/Icons";
import TrashIcon from "@porabote/ui/Icons/base/TrashIcon";
import {Button} from "@porabote/ui/Form";
import {ModalContext} from "@porabote";
import Api, {ResponseType} from "@porabote/api";
import EditMetaDataDialog from "@porabote/widgets/FilesWidget/Viewer/modals/EditMetaDataDialog";
import DownloadIcon from "@porabote/ui/Icons/base/DownloadIcon";
import {FILES_URL} from "@services/host/src/configs/Config";
import moment from "moment";

const FilesTable = (props: { files: any[] }) => {

  const {modal} = useContext(ModalContext);
  const {records, updateRecords} = useContext(FilesContext);

  const openEditDialog = (record: FileRecordType) => {
    modal.open(<EditMetaDataDialog fetchData={updateRecords}  record={record} title="Редиктировать запись"/>);
  }

  const openDeleteDialog = (record: FileRecordType) => {
    modal.open(
      <div style={{width: '500px', margin: '0 auto', textAlign: 'center'}}>
        <h5 style={{fontWeight: '400'}}>Уверены что хотите удалить запись?</h5>
      </div>,
      {
        mode: 'dialog',
        buttons: [
          <Button label='Отмена' onClick={(e, {closeDialog}) => closeDialog()}/>,
          <Button label='Да' fetchData={updateRecords} record={record} onClick={(e, props) => deleteRecord(props)}/>
        ],
        //fetchData: props.fetchData,
      });
  }

  const deleteRecord = ({record, closeDialog}) => {
    Api("/files/action/delete/")
      .setData({id: record.id})
      .onSuccess((response: ResponseType) => {
        closeDialog();
        updateRecords();
      })
      .get();
  }

  return (
    <Table className="files-viewer-table" gridTemplateColumns=" 140px minmax(200px, 1fr) 100px 50px 50px 100px">
      <Row>
        <Cell>Загружено</Cell>
        <Cell>Название файла / Описание</Cell>
        <Cell>Размер</Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
      </Row>
      {records.map((record: FileRecordType) => {

        return (
          <Row key={record.id}>
            <Cell>{moment(record.created_at).format("DD/MM/YYYY HH:mm")}</Cell>
            <Cell>{record.basename} / {record.alt}</Cell>
            <Cell>{Math.round(record.size / 1024)} Kb</Cell>
            <Cell>
              <Icon onClick={() => openEditDialog(record)}>
                <EditIcon/>
              </Icon>
            </Cell>
            <Cell>
              <Icon size={18} onClick={() => openDeleteDialog(record)}>
                <TrashIcon/>
              </Icon>
            </Cell>
            <Cell>
              <Icon size={20} onClick={() => {
                window.open(`${FILES_URL}${record.uri}`, "target=blank");
              }}>
                <DownloadIcon/>
              </Icon>
            </Cell>
          </Row>
        );
      })}
    </Table>
  );
};

export default FilesTable;