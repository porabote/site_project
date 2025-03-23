import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import moment from "moment";
import {
  Form,
  FormSchemaFields,
  FormSchemaButtons,
  FormSchema,
  Checkbox,
} from "@porabote/ui/Form";
import {SettingsContext} from "@porabote/middlewares/Settings";
import Api, {ResponseType} from "@porabote/api";
import {ModalContext} from "@porabote/widgets/ModalWidget";

type CommentRecordType = {
  label: string;
  record_id: number;
  msg: string;
};

type AddCommentPropsType = {
  label: string;
  record_id: number;
  title?: string;
  comment: CommentRecordType;
  callback: Function;
};

const AddComment = (props: AddCommentPropsType) => {

  const {lang} = useContext(SettingsContext);
  const {closeModal, pushBalloon} = useContext(ModalContext);

  const {comment, label, record_id, callback} = props;

  const submitHandler = ({values}) => {

    Api(values.id ? "/comments/action/update" : "/comments/action/create")
      .setData({...values})
      .onSuccess((resp: ResponseType) => {
        pushBalloon(lang == 'ru' ? "Данные сохранены" : "Record saved!");
        closeModal();
        if (typeof callback === "function") {
          callback(resp);
        }
      })
      .onApiError((error: ResponseType) => {
        pushBalloon(error);
      })
      .post();

  }

  const formSchema = new FormSchema()
    .setField({
      name: 'msg',
      label: {ru: 'Комментарий*', en: 'Comment*'},
      component: 'textarea',
      isEmpty: true,
    })
    .setButtons([
      {
        label: {ru: 'Сохранить', en: 'Save'},
        class: 'prb-button blue',
        type: 'submit',
        name: 'login_button',
      }
    ]);

  if (comment) {
    formSchema.setInitialValues(comment);
  } else {
    formSchema.setInitialValues({
      label,
      record_id,
    });
  }

  formSchema.setSubmit(submitHandler);

  return (
    <div className="box" style={{width: '540px', margin: '0 auto'}}>
      <div className="box-body">
        <Form schema={formSchema}>
          <FormSchemaFields/>
          <div style={{display: 'flex', alignContent: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <div style={{padding: "25px 0", width: '140px'}}>
              <FormSchemaButtons/>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddComment;
