import React, {useContext, useEffect, useState} from "react";
import {SettingsContext} from "@porabote/middlewares/Settings";
import {Form, FormSchema, FormSchemaButtons, FormSchemaFields} from "@porabote/ui/Form";
import Api from "@porabote/api";
import {ModalContext} from "@porabote/widgets/ModalWidget";


const DeclineDialog = (props) => {

  const {step, declineHandler} = props;

  const {lang} = useContext(SettingsContext);
  const {closeModal, pushBalloon} = useContext(ModalContext);

  const submitHandler = ({values}) => {
    declineHandler({...values, step});
    closeModal();
  }

  const formSchema = new FormSchema()
    .setField({
      name: 'reason',
      type: 'text-editor',
      label: {ru: 'Причина отклонения', en: 'Reason*'},
      component: 'text-editor',
      rules: [
          {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ],
    })
    .setButtons([
      {
        label: {ru: 'Сохранить', en: 'Save'},
        class: 'prb-button blue',
        type: 'submit',
        name: 'login_button',
      }
    ]);

  formSchema.setLang(lang);
  formSchema.setSubmit(submitHandler);

  return (
    <div className="box login" style={{width: '740px', margin: '0 auto'}}>

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

export default DeclineDialog;
