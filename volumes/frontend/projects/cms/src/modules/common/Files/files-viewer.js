import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Api from "@services";
import { pushItemToModal, removeModalItem } from "porabote/modal";
import Upload, { PreviewPanel, FileInput } from "porabote/upload";
import {
  Form,
  Field,
  Input,
  InputHidden,
  SubmitButton,
  Button,
} from "porabote/form";
import Table, { Row, Cell } from "porabote/table";
import FileDownloadDoneRoundedIcon from "@mui/icons-material/FileDownloadDoneRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import EditIcon from "@mui/icons-material/Edit";
import { FILES_URL } from "@configs";
import File from "./models/file";
import EditForm from "./forms/edit-form";
import "./files-viewer.less";
import moment from "moment";

const FilesViewer = (props) => {
  moment.locale("ru");

  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);

  const uploadCallback = (files) => {
    getFiles();
  };

  useEffect(() => {
    getFiles();
  }, []);

  async function getFiles() {
    const records = await File.where({
      record_id: props.foreignKey,
      model_alias: props.model,
    }).get();

    setFiles(records.data || []);
  }

  async function upload(formData) {
    const fileUploaded = await File.upload(formData);
    getFiles();
  }

  const openEditableModal = (id) => {
    dispatch(
      pushItemToModal(
        <EditForm
          id={id}
          callback={() => {
            dispatch(removeModalItem(0));
            getFiles();
          }}
        />,
        "Редактировать описание",
      ),
    );
  };

  async function deleteFile(id) {
    await File.delete(id);
    getFiles();
  }

  const setDataFields = (file, index) => (
    <div>
      <Field>
        <Input
          placeholder="Комментарий"
          name={`filesCustomData.${index}.dscr`}
        />
      </Field>
    </div>
  );

  return (
    <div>
      <Upload
        upload={upload}
        data={{
          record_id: props.foreignKey,
          model_alias: props.model,
        }}
      >
        <FileInput name="files[]" uploadCallback={uploadCallback} />
        <PreviewPanel setDataFields={setDataFields}></PreviewPanel>
      </Upload>

      <h3 style={{ padding: "50px 0px 20px 10px" }}>Загруженные файлы</h3>

      <Table
        border={true}
        grid-template-columns="minmax(300px, 1fr) 160px 100px 140px 50px 50px"
      >
        <Row className="head">
          <Cell>Название/Комментарий</Cell>
          <Cell>Дата</Cell>
          <Cell>Размер</Cell>
          <Cell>Тип</Cell>
          <Cell></Cell>
          <Cell></Cell>
        </Row>
        {files.map((file, index) => (
          <Row key={index}>
            <Cell>
              <a
                className="file-upload-link"
                href={`${FILES_URL}${file.attributes.uri}`}
                target="_blank"
                rel="noreferrer"
              >
                {file.attributes.basename}
              </a>
              <p>{file.attributes.dscr}</p>
            </Cell>
            <Cell>
              {moment(file.attributes.created_at).format("DD MMM YYYY, HH:mm")}
            </Cell>
            <Cell>{`${Math.round(file.attributes.size / 1024)}`} KB</Cell>
            <Cell>{file.attributes.mime}</Cell>
            <Cell className="preview-panel__cell-delete">
              <EditIcon
                style={{ fontSize: "19px" }}
                className="link_with_icon"
                onClick={() => openEditableModal(file.id)}
              />
            </Cell>
            <Cell className="preview-panel__cell-delete">
              <RemoveCircleOutlineRoundedIcon
                onClick={() => deleteFile(file.id)}
                className="preview-panel__delete-icon"
              />
            </Cell>
          </Row>
        ))}
      </Table>
    </div>
  );
};

export default FilesViewer;
