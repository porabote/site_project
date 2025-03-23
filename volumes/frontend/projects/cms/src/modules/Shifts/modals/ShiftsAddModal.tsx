import React, {useContext, useEffect, useState} from "react";
import {SettingsContext} from "@porabote/middlewares/Settings";
import {Form, FormSchema, FormSchemaButtons, FormSchemaFields} from "@porabote/ui/Form";
import Api from "@porabote/api";
import {ModalContext} from "@porabote/widgets/ModalWidget";

const ShiftsAddModal = (props: {data: any, fetchData: Function}) => {

  const {lang} = useContext(SettingsContext);
  const {closeModal, pushBalloon} = useContext(ModalContext);

  const configs = {
    submitSuccess: {
      ru: "Пункт добавлен",
      en: "Record was added!",
    }
  };

  const [usersList, setUsersList] = useState([]);

  const submitHandler = async ({values}: {values: any}) => {

    const req = await Api(`/shifts/action/${props.data ? 'edit' : 'add'}`).setData({...values}).post();

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
    Api("/users/get").onSuccess((response: any) => {
      setUsersList(response.data);
    }).get();
  }

  useEffect(() => {
    getDicts();
  }, []);

  if (!usersList.length) {
    return <>Загрузка</>;
  }

  const formSchema = new FormSchema()
    .setField({
      name: 'name',
      component: 'input',
      type: 'text',
      elementProps: {
        disableCalendar: false
      },
      label: {ru: 'Наименование*', en: 'Name*'},
      placeholder: {ru: "Наименование", en: "Name"},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ]
    })
    .setField({
      name: 'head_user_id',
      type: 'select',
      label: {ru: 'Руководитель*', en: 'Head manager*'},
      component: 'select',
      isEmpty: true,
      data: [...usersList],
      optionTitle: (record: any) => {
        return `${record['sur_name']} ${record['first_name']}`;
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
    .setInitialValues(props.data ? {...props.data} : {});

  formSchema.setButtons([
    {
      label: {ru: 'Сохранить', en: 'Save'},
      class: 'prb-button blue',
      type: 'submit',
      name: 'login_button',
    }
  ]);

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

export default ShiftsAddModal;
