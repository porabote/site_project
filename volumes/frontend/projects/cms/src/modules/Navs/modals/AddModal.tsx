import React, {useContext, useEffect, useState} from "react";
import {SettingsContext} from "@porabote/middlewares/Settings";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "@porabote/middlewares/Auth";
import {Form, FormSchema, FormSchemaButtons, FormSchemaFields} from "@porabote/ui/Form";
import Api from "@porabote/api";
import {ModalContext} from "@porabote/widgets/ModalWidget";


const AddModal = (props) => {

  const {lang} = useContext(SettingsContext);
  const {signUp} = useContext(AuthContext);
  const {closeModal, pushBalloon} = useContext(ModalContext);
  const navigate = useNavigate();

  const configs = {
    submitSuccess: {
      ru: "Пункт добавлен",
      en: "Record was added!",
    }
  };

  const [parentsList, setParentsList] = useState([]);
  const [dictLoading, setDictLoading] = useState(true);

  const submitHandler = async ({values}) => {

    const req = await Api("/navs/action/add").setData({...values}).post();

    if (req.getApiError()) {
      pushBalloon(req.getApiError());
      return;
    } else {
      pushBalloon(configs.submitSuccess[lang]);
      props.fetchData({dropData: true});
      closeModal();
    }
  }

  const getDicts = async () => {
    const req = await Api("/navs/action/getUserMenu").get();
    setParentsList(req.response.data);
    setDictLoading(false);
  }

  useEffect(() => {
    getDicts();
  }, []);

  if (dictLoading) {
    return <p></p>;
  }

  const formSchema = new FormSchema()
    .setField({
      name: 'name_ru',
      component: 'input',
      type: 'text',
      label: {ru: 'Название Ru*', en: 'Name RU*'},
      placeholder: {ru: "Название", en: "name"},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setField({
      name: 'name_en',
      component: 'input',
      type: 'text',
      label: {ru: 'Название En *', en: 'Name En*'},
      placeholder: {ru: "Название", en: "name"},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setField({
      name: 'link',
      component: 'input',
      type: 'text',
      label: {ru: 'Ссылка', en: 'Link'},
      placeholder: {ru: "/", en: "/"},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setField({
      name: 'parent_id',
      type: 'select',
      label: {ru: 'Родитель*', en: 'Parent*'},
      component: 'select',
      inputElement: 'div',
      isEmpty: true,
      data: parentsList,
      optionTitle: (record) => {
        return record[`name_${lang}`];
      }
    })
    .setButtons([
      {
        label: {ru: 'Зарегистрироваться', en: 'Sign up'},
        class: 'prb-btn-login',
        type: 'submit',
        name: 'login_button',
      }
    ]);

  formSchema.setSubmit(submitHandler)
    .setLang(lang)
    .setInitialValues(props.record ? {...props.record} : {});

  formSchema.setButtons([
    {
      label: {ru: 'Сохранить', en: 'Save'},
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
    <div className="box login" style={{width: '340px', margin: '0 auto'}}>

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

export default AddModal;
