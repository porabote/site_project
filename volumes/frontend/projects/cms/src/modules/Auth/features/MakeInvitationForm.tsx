import React from 'react';
import Api from "@porabote/api";
import {useNavigate} from "react-router-dom";
import {Form, FormSchema, FormSchemaButtons, FormSchemaFields} from "@porabote/ui/Form";

const MakeInvitationForm = () => {

  const navigate = useNavigate();

  const submitHandler = async ({values}) => {

    const req = await Api('/auth/action/makeInvitation')
      .setData({...values})
      .post();

    if (req.getApiError()) {
      return pushBalloon(req.getApiError());
    } else {
      navigate('/auth/make-invitation');
    }
  }

  const formSchema = new FormSchema()
    .setField({
      name: 'name',
      component: 'input',
      type: 'text',
      placeholder: {ru: "имя", en: "name"},
      label: {ru: 'Имя*', en: 'Name*'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setField({
      name: 'sur_name',
      component: 'input',
      type: 'text',
      placeholder: {ru: "Фамилия", en: "Surname"},
      label: {ru: 'Фамилия', en: 'Surname'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setField({
      name: 'middle_name',
      component: 'input',
      type: 'text',
      placeholder: {ru: "Отчество", en: "Middle name"},
      label: {ru: 'Отчество', en: 'Middle name'},
    })
    .setField({
      name: 'post_name',
      component: 'input',
      type: 'text',
      placeholder: {ru: "Должность", en: "Post"},
      label: {ru: 'Должность', en: 'Post'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setField({
      name: 'phone',
      component: 'input',
      type: 'text',
      placeholder: {ru: "", en: ""},
      label: {ru: 'Телефон', en: 'Phone'},
    })
    .setField({
      name: 'email',
      component: 'input',
      type: 'text',
      placeholder: {ru: "email", en: "email"},
      label: {ru: 'Электронная почта', en: 'Email'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setButtons([
      {
        label: {ru: 'Создать приглашение', en: 'Make invitation'},
        class: 'prb-button blue',
        type: 'submit',
        name: 'login_button',
      }
    ]);

  formSchema.setSubmit(submitHandler);


  return (
    <Form schema={formSchema}>
      <FormSchemaFields/>
      <div style={{padding: "25px 0"}}>
        <FormSchemaButtons/>
      </div>
    </Form>
  );
};

export default MakeInvitationForm;