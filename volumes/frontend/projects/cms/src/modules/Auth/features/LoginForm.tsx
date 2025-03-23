import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Form} from "@packages/porabote/src/ui/Form";
import PasswordEyeIcon from "@packages/porabote/src/ui/Icons/forms/PasswordEyeIcon";
import Icon from "@packages/porabote/src/ui/Icons";
import {AuthContext} from "@packages/porabote";
import {SettingsContext} from "@packages/porabote";
import FormSchema from "@packages/porabote/src/ui/Form/Schema/FormSchema";
import FormSchemaFields from "@packages/porabote/src/ui/Form/Schema/FormSchemaFields";
import FormSchemaButtons from "@packages/porabote/src/ui/Form/Schema/FormSchemaButtons";
import {ModalContext} from "@packages/porabote/src/widgets/ModalWidget";

const LoginForm = () => {

  const {lang, setLang} = useContext(SettingsContext);
  const {login} = useContext(AuthContext);
  const {pushBalloon} = useContext(ModalContext);
  const navigate = useNavigate();

  const loginHandler = async ({values}) => {

    login({...values},
      () => {navigate('/auth/accounts');},
      (error: string) => {
        pushBalloon(error);
      }
    );
    // const req = await Api(LOGIN_API_URL).setData({...values}).post();
    //
    // if (req.getApiError()) {
    //   pushBalloon(req.getApiError());
    //   return;
    // } else {
    //   login(req.response.data);
    // //  navigate('/auth/accounts');
    // }
  }

  const formSchema = new FormSchema()
    .setSubmit(loginHandler)
    .setLang(lang)
    .setField({
      name: 'username',
      component: 'input',
      //  valueFormat: "integer",
      ///  mask: "+99999999999",
      type: 'text',
      label: {ru: 'Логин', en: 'Login'},
      placeholder: {ru: "Логин", en: "Login"},
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
    .setButtons([
      {
        label: {ru: 'Войти', en: 'Sign in'},
        class: 'prb-button blue',
        type: 'submit',
        name: 'login_button',
      }
    ]);

  // formSchema.setInitialValues({
  //   username: 'maksimov_den@mail.ru',
  //   password: 'z7893727',
  // });

  formSchema.getField('password').setProp('elementProps', {
    icons: [
      <Icon
        fill="#FF0000"
        style={{width: '30px', padding: '11px 20px 0 0'}}
        handleOnMouseDown={(event: React.MouseEvent<HTMLDivElement>, props: { [key: string]: any }) => {
          props.setInputType("text");
        }}
        handleOnMouseUp={(event: React.MouseEvent<HTMLDivElement>, props: { [key: string]: any }) => {
          props.setInputType("password");
        }}
      ><PasswordEyeIcon/></Icon>
    ],
  },);

  return (
    <Form schema={formSchema}>
      <FormSchemaFields/>
      <div style={{padding: "25px 0"}}>
        <FormSchemaButtons/>
      </div>
    </Form>
  );
};

export default LoginForm;