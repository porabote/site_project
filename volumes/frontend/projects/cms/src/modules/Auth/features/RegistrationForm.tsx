import React, {useContext} from "react";
import {Form, FormSchema, FormSchemaFields, FormSchemaButtons} from "@packages/porabote/src/ui/Form";
import {SettingsContext} from "@packages/porabote";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "@packages/porabote";
import {ModalContext} from "@packages/porabote/src/widgets/ModalWidget";


const RegistrationForm = () => {

  const {lang} = useContext(SettingsContext);
  const {signUp} = useContext(AuthContext);
  const {pushBalloon} = useContext(ModalContext);
  const navigate = useNavigate();

  const configs = {
    signUpSuccess: {
      ru: "Вы успешно зарегистрированы!",
      en: "You are successfully registered!",
    }
  };

  const signUpHandler = async ({values}) => {

    const res = await signUp(values);

    if (typeof res.error != "undefined") {
      pushBalloon(res.error);
      return;
    } else {
      pushBalloon(configs.signUpSuccess[lang]);
      navigate('/auth/signIn');
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
      name: 'surname',
      component: 'input',
      type: 'text',
      placeholder: {ru: "Фамилия", en: "Surname"},
      label: {ru: 'Фамилия', en: 'Surname'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    // .setField({
    //   name: 'phone',
    //   component: 'input',
    //   type: 'text',
    //   placeholder: {ru: "", en: ""},
    //   label: {ru: 'Телефон*', en: 'Phone*'},
    // })
    .setField({
      name: 'email',
      component: 'input',
      type: 'text',
      placeholder: {ru: "email", en: "email"},
      label: {ru: 'Электронная почта', en: 'Email'},
    })
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
    .setField({
      name: 'password_confirm',
      type: 'password',
      component: 'input',
      placeholder: {ru: "*****", en: "*****"},
      label: {ru: 'Пароль повторно*', en: 'Password repeat*'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    // .setField({
    //   name: 'birth',
    //   type: 'date',
    //   component: 'input-date',
    //   label: {ru: 'Дата рождения', en: 'Birth date'},
    // })
    // .setField({
    //   name: 'notify_flg',
    //   type: 'checkbox',
    //   component: 'checkbox',
    //   label: {ru: 'Хочу получать уведомления', en: 'Receive notifications'},
    // })
    .setButtons([
      {
        label: {ru: 'Зарегистрироваться', en: 'Sign up'},
        class: 'prb-btn-login',
        type: 'submit',
        name: 'login_button',
      }
    ]);


  formSchema.setSubmit(signUpHandler)
    .setLang(lang)
    .setInitialValues({
      name: "Денис",
      surname: "Максимов",
      phone: "+79267064488",
      email: "maksimov_den@mail.ru",
      password: "z7893727",
      password_confirm: "8988",
      notify_flg: 1,
    });

  formSchema.setButtons([
    {
      label: {ru: 'Зарегистрироваться', en: 'Sign up'},
      class: 'prb-button blue',
      type: 'submit',
      name: 'login_button',
    }
  ]);

  const config = {
    title: {
      ru: 'Регистрация',
      en: 'Sign up',
    }
  }

  return (
    <Form schema={formSchema}>
      <FormSchemaFields/>
      <div style={{padding: "25px 0"}}>
        <FormSchemaButtons/>
      </div>
    </Form>
  );
};

export default RegistrationForm;
