import React, {useContext} from "react";
import {
  Form,
  FormSchemaFields,
  FormSchemaButtons,
  FormSchema,
} from "@porabote/ui/Form";
import {SettingsContext} from "@porabote/middlewares/Settings";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "@porabote/middlewares/Auth";
import Api from "@porabote/api";
import {ModalContext} from "@porabote/widgets/ModalWidget";


const AddModal = (props) => {

  const {lang} = useContext(SettingsContext);
  const {signUp} = useContext(AuthContext);
  const {closeModal, pushBalloon} = useContext(ModalContext);
  const navigate = useNavigate();

  const submitHandler = async ({values}) => {

    if (props.data) {
      updateRecord(values);
      return;
    }
    //const req = await Api("/users-invitations/action/makeInvitation").setData({...values}).post();
    const req = await Api("/users/action/create").setData({...values}).post();

    if (req.getApiError()) {
      pushBalloon(req.getApiError());
      return;
    } else {
      pushBalloon(lang == 'ru' ? "Запись сохранена" : "Record saved!");
      props.fetchData({dropData: true});
      closeModal();
    }
  }

  const updateRecord = async (values) => {

    const req = await Api("/users/action/update").setData({...values}).post();

    if (req.getApiError()) {
      pushBalloon(req.getApiError());
      return;
    } else {
      pushBalloon(lang == 'ru' ? "Запись сохранена" : "Record saved!");
      closeModal();
    }
  }

 // const [clubs, setClubs] = useState([]);

  // const getDicts = async () => {
  //   const req = await Api("/clubs/get").get();
  //   setClubs(req.reaponse.data);
  // }

  // useEffect(() => {
  //   getDicts();
  // }, []);

  // if (!clubs.length) {
  //   return <p></p>;
  // }

  const config = {
    title: {
      ru: 'Сохранить',
      en: 'Sign up',
    }
  }

  const formSchema = new FormSchema()
    .setField({
      name: 'first_name',
      component: 'input',
      type: 'text',
      placeholder: {ru: "имя", en: "name"},
      label: {ru: 'Имя*', en: 'Name*'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ],
    })
    .setField({
      name: 'sur_name',
      component: 'input',
      type: 'text',
      placeholder: {ru: "Фамилия", en: "Surname"},
      label: {ru: 'Фамилия*', en: 'Surname*'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ],
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
      label: {ru: 'Должность*', en: 'Post*'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ],
    })
    .setField({
      name: 'email',
      component: 'input',
      type: 'text',
      placeholder: {ru: "email*", en: "email*"},
      label: {ru: 'Электронная почта', en: 'Email'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ],
    })
    .setField({
      name: 'phone',
      valueFormat: "integer",
      mask: "+99999999999999",
      component: 'inputMask',
      type: 'text',
      placeholder: {ru: "", en: ""},
      label: {ru: 'Телефон', en: 'Phone'},
    })
    .setField({
      name: 'status',
      component: 'select',
      optionValueKey: 'id',
      type: 'text',
      label: {ru: 'Статус', en: 'Status'},
      data: [
        {id: 'new', name: 'Новый'},
        {id: 'invited', name: 'Приглашён'},
        {id: 'external', name: 'Внешний'},
        {id: 'active', name: 'Активен'},
        {id: 'fired', name: 'Уволен'},
      ],
    })
    .setField({
      name: 'is_su',
      type: 'checkbox',
      component: 'checkbox',
      label: {ru: 'Суперпользователь', en: 'Super user'},
    })
    .setButtons([
      {
        label: {ru: 'Сохранить', en: 'Save'},
        class: 'prb-button blue',
        type: 'submit',
        name: 'login_button',
      }
    ]);


  if (props.data) {
    formSchema.setInitialValues(props.data);
  } else {
    formSchema.setInitialValues({
      role_id: 1,
      status: 'active',
    });
  }

  formSchema.setSubmit(submitHandler);

  return (
    <div className="box" style={{width: '540px', margin: '0 auto'}}>
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
