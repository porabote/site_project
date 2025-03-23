import React, {useEffect, useState, useContext} from 'react';
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {Api} from "@porabote";
import {Form, FormSchemaFields, FormSchemaButtons, FormSchema} from "@porabote/ui/Form";
import {ModalContext} from "@porabote/widgets/ModalWidget";

const AcceptInvitationPage = () => {

  const {id} = useParams();
  const {pushBalloon} = useContext(ModalContext);
  const navigate = useNavigate();

  const [record, setRecord] = useState(null);

  useEffect(() => {
    getRecord();
  }, []);

  const submitHandler = async ({values}) => {
    const req = await Api('/users-invitations/action/accept')
      .setData({...values})
      .post();

    if (req.getApiError()) {
      pushBalloon(req.getApiError());
    }

    navigate('/auth/login');
  }

  const getRecord = async () => {
    const req = await Api("/users-invitations/action/getUserInvitation")
      .setData({code: id})
      .post();
    setRecord(req.response.data);
  }

  if (!record) {
    return <div>Токен не найден или просрочен</div>;
  }

  const formSchema = new FormSchema()
    .setSubmit(submitHandler)
    // .setLang(lang)
    //  .setField({
    //    name: 'username',
    //    component: 'input',
    //    readOnly: true,
    //    type: 'text',
    //    label: {ru: 'Логин', en: 'Login'},
    //    placeholder: {ru: "Логин", en: "Login"},
    //    rules: [
    //      {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
    //    ]
    //  })
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
    .setButtons([
      {
        label: {ru: 'Сохранить', en: 'Save'},
        class: 'prb-button blue',
        type: 'submit',
        name: 'login_button',
      }
    ]);

  formSchema.setInitialValues({
    code: id,
  })

  return (
    <div className="box login_block" style={{width: '320px', margin: '0 auto'}}>
      <div className="box-body">
        <h3>Вы приглашены под логином: {record.user.username}</h3>

        <Form schema={formSchema}>
          <FormSchemaFields/>
          <div style={{padding: "25px 0"}}>
            <FormSchemaButtons/>
          </div>
        </Form>

      </div>
    </div>
  );
};

export default AcceptInvitationPage;