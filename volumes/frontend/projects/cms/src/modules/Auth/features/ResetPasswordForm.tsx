import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import FormSchema from "@packages/porabote/src/ui/Form/Schema/FormSchema";
import {SettingsContext} from "@packages/porabote";
import {ModalContext} from "@porabote/widgets/ModalWidget";
import {Form} from "@packages/porabote/src/ui/Form";
import FormSchemaFields from "@packages/porabote/src/ui/Form/Schema/FormSchemaFields";
import FormSchemaButtons from "@packages/porabote/src/ui/Form/Schema/FormSchemaButtons";
import Api from "@porabote/api";

const ResetPasswordForm = () => {

    const {lang} = useContext(SettingsContext);
    const {pushBalloon} = useContext(ModalContext);
    const navigate = useNavigate();

    const submitHandler = async ({values}) => {

      const res = await Api('/auth/resetPassword/')
        .setData({...values})
        .post();

      if (res.getApiError()) {
        return pushBalloon(res.getApiError());
      } else {
        navigate('/auth/login');
      }
    }


    const formSchema = new FormSchema()
      .setSubmit(submitHandler)
      .setLang(lang)
      .setField({
        name: 'code',
        component: 'inputMask',
        valueFormat: "integer",
        mask: "999999",
        type: 'text',
        placeholder: {ru: "код", en: "code"},
        label: {ru: 'Код', en: 'Сode'},
        rules: [
          {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
        ]
      })
      .setField({
        name: 'password',
        type: 'password',
        component: 'input',
        placeholder: {ru: "*****", en: "*****"},
        label: {ru: 'Пароль (мин. 6 символов)', en: 'Password (min 6 char)'},
        rules: [
          {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
        ]
      })
      .setField({
        name: 'password_confirm',
        type: 'password',
        component: 'input',
        placeholder: {ru: "*****", en: "*****"},
        label: {ru: 'Пароль (мин. 6 символов)', en: 'Password (min 6 char)'},
        rules: [
          {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
        ]
      })
      .setButtons([
        {
          label: {ru: 'Сохранить пароль', en: 'Reset password'},
          class: 'prb-button blue',
          type: 'submit',
          name: 'login_button',
        }
      ]);

    formSchema.setInitialValues({
      // code: 366082,
      // password: 'z7893727',
      // password_confirm: 'z7893727',
    });

    return (
        <Form schema={formSchema}>

          <FormSchemaFields/>

          <div style={{padding: "25px 0"}}>
            <FormSchemaButtons/>
          </div>
        </Form>
    );
  }

export default ResetPasswordForm;