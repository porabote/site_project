import React, {useContext} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Form} from "@/app/form";
import {AuthContext} from "@/app/auth-wrapper";
import {SettingsContext} from "@/app/settings/settings";
import FormSchema from "@/app/form/schema/FormSchema";
import FormSchemaFields from "@/app/form/schema/form-schema-fields";
import FormSchemaButtons from "@/app/form/schema/form-schema-buttons";
import {BalloonContext} from "@/app/balloon/balloon-wrapper";
import GuestsService from "@/components/guests/guests-service";

const PasswordGetCodeForm = () => {

  const {lang, setLang} = useContext(SettingsContext);
  const {showBalloon} = useContext(BalloonContext);
  const navigate = useNavigate();

  const config = {
    title: {
      ru: 'Авторизация',
      en: 'Login',
    }
  }

  const switchLang = () => {
    setLang(lang == "ru" ? 'en' : 'ru');
  }

  const resetHandler = async ({values}) => {

    const res = await GuestsService.getResetPswCode(values.phone);

    if (res.error) {
      showBalloon(res.error);
      return;
    } else {
      if (res.error != undefined) {
        showBalloon(res.error);
        return;
      }

      navigate('/auth/password-change');
    }
  }

  const formSchema = new FormSchema()
    .setSubmit(resetHandler)
    .setLang(lang)
    .setField({
      name: 'phone',
      component: 'inputMask',
      valueFormat: "integer",
      mask: "+99999999999",
      type: 'text',
      placeholder: {ru: "Телефон", en: "Phone"},
      label: {ru: 'Номер телефона', en: 'Phone number'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setButtons([
      {
        label: {ru: 'Получить код', en: 'Get code'},
        class: 'prb-btn-login',
        type: 'submit',
        name: 'login_button',
      }
    ]);

  formSchema.setInitialValues({
    phone: '',
  });

  return (
    <div className="box login_block" style={{width: '320px', margin: '0 auto'}}>

      {/*<h2 style={{padding: '0px 0 20px 0'}}>{config.title[lang]}</h2>*/}

      <div className="box-body">
        <Form schema={formSchema}>
          <FormSchemaFields/>
          <div style={{padding: "25px 0"}}>
            <FormSchemaButtons/>
          </div>
        </Form>

        <div
          style={{
            padding: "15px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "space-between",
            alignContent: "space-between"
          }}>
          <NavLink to={"/auth/signIn"}>
            {lang == "ru" && "Вход"}
            {lang == "en" && "Sign in"}
          </NavLink>

          <div>
            {lang == "ru" && <a href="#" onClick={switchLang}>English</a>}
            {lang == "en" && <a href="#" onClick={switchLang}>Рyсский</a>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PasswordGetCodeForm;