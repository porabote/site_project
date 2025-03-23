import React, {useContext} from 'react';
import {
  Form,
  FormSchemaFields,
  FormSchemaButtons,
  FormSchema,
} from "@porabote/ui/Form";
import {Api} from "@porabote";
import {SettingsContext} from "@porabote/middlewares/Settings";
import {ModalContext} from "@porabote/widgets/ModalWidget";

const ChangePasswordModal = (props) => {

  const {lang} = useContext(SettingsContext);
  const {closeModal, pushBalloon} = useContext(ModalContext);

  const submitHandler = async ({values}) => {

    const req = await Api("/users/action/changePassword").setData({
      user_id: props.data.id,
      password: values.password,
    }).post();

    if (req.getApiError()) {
      pushBalloon(req.getApiError());
      return;
    } else {
      pushBalloon(lang == 'ru' ? 'Пароль изменён' : 'Password changed');
      closeModal();
    }
  }

  const formSchema = new FormSchema()
    .setField({
      name: 'password',
      type: 'password',
      component: 'input',
      placeholder: {ru: "*****", en: "*****"},
      label: {ru: 'Пароль*', en: 'Password*'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setButtons([
      {
        label: {ru: 'Изменить пароль', en: 'Change password'},
        class: 'prb-button blue',
        type: 'submit',
        name: 'login_button',
      }
    ]);

  formSchema.setSubmit(submitHandler)
    .setLang(lang);

  return (
    <div>
      <div className="box-body">
        <Form schema={formSchema}>
          <FormSchemaFields/>
          <div style={{padding: "25px 0", width: "150px"}}>
            <FormSchemaButtons/>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;