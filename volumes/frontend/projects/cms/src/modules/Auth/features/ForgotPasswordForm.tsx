import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Input, Button, Select} from "@packages/porabote/src/ui/Form";
import PasswordEyeIcon from "@packages/porabote/src/ui/Icons/forms/PasswordEyeIcon";
import Icon from "@packages/porabote/src/ui/Icons";
import {FormContextType, FormSchemaType} from "@packages/porabote/src/ui/Form/FormTypes";
import {InputDate} from "@packages/porabote/src/ui/Form";
import {AuthContext, SettingsContext} from "@packages/porabote";
import {ModalContext} from "@packages/porabote/src/widgets/ModalWidget";

type PropsType = {
  registration: (context: FormContextType) => void;
}

const RegistrationForm = (props: PropsType) => {

  const {lang} = useContext(SettingsContext);
  const {pushBalloon} = useContext(ModalContext);

  const formSchema: FormSchemaType = {
    title: {
      ru: 'Регистрация',
      en: 'Sign Up in the game',
    },
    button: {
      title: {
        ru: 'Зарегистрироваться',
        en: 'Sign Up',
      },
      class: 'prb-button blue',
    },
    submit: props.registration,
    initValues: {
      name: "",
      email: "",
      date_birth: '',
      password: '',
      password_confirm: '',
      sex: '',
      lang: lang,
      account_id: 1,
    },
    fields: {
      name: {
        type: 'input',
        label: {
          ru: 'Имя*',
          en: 'Name*',
        },
        rules: [
          {
            type: 'required',
            prompt: 'Поле "Имя" не заполнено'
          },
        ]
      },
      email: {
        type: 'input',
        label: {
          ru: 'Электронная почта*',
          en: 'Email*',
        },
        rules: [
          {
            type: 'required',
            prompt: 'Поле "Email" не заполнено'
          },
          // {
          //   type: 'minLength[8]',
          //   prompt: 'Минимальное количество символов 8'
          // }
        ]
      },
      date_birth: {
        type: 'date',
        label: {
          ru: 'Дата рождения',
          en: 'Date of Birth',
        },
        // rules: [
        //   'not_empty'
        // ]
      },
      sex: {
        type: 'select',
        label: {
          ru: 'Пол',
          en: 'Sex',
        }
      },
      password: {
        type: 'password',
        label: {
          ru: 'Пароль*',
          en: 'Password*',
        },
        rules: [
          {
            type: 'required',
            prompt: 'Поле "Пароль" не заполнено'
          },
        ],
      },
      password_confirm: {
        type: 'password',
        label: {
          ru: 'Пароль повторно*',
          en: 'Password confirm*',
        },
        rules: [
          {
            type: 'required',
            prompt: 'Поле "Пароль" не заполнено'
          },
        ],
      },
    }
  };

  const navigate = useNavigate();
  const {signUp} = useContext(AuthContext);

  const signUpHandler = ({values}) => {

    const callback = (response) => {
      if (response.error) {
        pushBalloon(response.error);
        return;
      }

      navigate('/signIn');
    }

    signUp(values, callback);
  }

  return (

    <Form
      onSubmit={signUpHandler}
      initValues={{...formSchema.initValues}}
      schema={formSchema}>


      <Input
        type="hidden"
        value={lang}
        name="lang"/>


      <Input
        placeholder={formSchema.fields.name.label[lang]}
        label={formSchema.fields.name.label[lang]}
        name="name"/>

      <Input
        placeholder={formSchema.fields.email.label[lang]}
        label={formSchema.fields.email.label[lang]}
        name="email"/>

      <InputDate
        placeholder=""
        disableCalendar={true}
        label={formSchema.fields.date_birth.label[lang]}
        name="date_birth"/>

      <Select
        label={formSchema.fields.sex.label[lang]}
        data={[{name: 'Male', id: 'male'}, {name: 'Female', id: 'female'}, {name: 'Other', id: 'other'}]}
        value='other'
        name="sex"/>

      <Input
        placeholder="*****"
        label={formSchema.fields.password.label[lang]}
        name="password"
        type="password"
        elementProps={{
          icons: [
            <Icon
              style={{width: '30px', padding: '11px 20px 0 0'}}
              handleOnMouseDown={(event: React.MouseEvent<HTMLDivElement>, props: { [key: string]: any }) => {
                props.setInputType("text");
              }}
              handleOnMouseUp={(event: React.MouseEvent<HTMLDivElement>, props: { [key: string]: any }) => {
                props.setInputType("password");
              }}
            ><PasswordEyeIcon/></Icon>
          ],
        }}
      />

      <Input
        placeholder="*****"
        label={formSchema.fields.password_confirm.label[lang]}
        name="password_confirm"
        type="password"
        elementProps={{
          icons: [
            <Icon
              style={{width: '30px', padding: '11px 20px 0 0'}}
              handleOnMouseDown={(event: React.MouseEvent<HTMLDivElement>, props: { [key: string]: any }) => {
                props.setInputType("text");
              }}
              handleOnMouseUp={(event: React.MouseEvent<HTMLDivElement>, props: { [key: string]: any }) => {
                props.setInputType("password");
              }}
            ><PasswordEyeIcon/></Icon>
          ],
        }}
      />


      <div style={{padding: "25px 0"}}>

        <Button
          className="prb-button blue"
          type="submit"
          label={formSchema.button.title[lang]}/>

      </div>

      <div
        style={{
          padding: "15px 0",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-end",
        }}
      >
      </div>
    </Form>
  );
};

export default RegistrationForm;
