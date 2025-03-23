import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Form, FormSchema, FormSchemaFields, FormSchemaButtons} from "@porabote/ui/Form";
import {SettingsContext} from "@porabote/middlewares/Settings";
import Api from "@porabote/api";
import {ModalContext} from "@porabote/widgets/ModalWidget";

const ResetPasswordByEmailForm = () => {

  const {lang, setLang} = useContext(SettingsContext);
  const {pushBalloon} = useContext(ModalContext);
  const navigate = useNavigate();

  const resetHandler = async ({values}: { values: { email: string } }) => {

    const res = await Api('/auth/resetPasswordByEmail')
      .setData({...values})
      .post();

    if (res.getApiError()) {
      return pushBalloon(res.getApiError());
    } else {
      navigate('/auth/reset-password');
    }

  }

  const formSchema = new FormSchema()
    .setSubmit(resetHandler)
    .setLang(lang)
    .setField({
      name: 'email',
      component: 'input',
      valueFormat: "integer",
      type: 'text',
      placeholder: {ru: "email", en: "email"},
      label: {ru: 'Email', en: 'Email'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setButtons([
      {
        label: {ru: 'Отправить запрос', en: 'Send request'},
        class: 'prb-button blue',
        type: 'submit',
        name: 'login_button',
      }
    ]);

  // formSchema.setInitialValues({
  //   email: 'maksimov_den@mail.ru',
  // });

  return (
    <Form schema={formSchema}>
      <FormSchemaFields/>
      <div style={{padding: "25px 0"}}>
        <FormSchemaButtons/>
      </div>
    </Form>
  );
};

export default ResetPasswordByEmailForm;