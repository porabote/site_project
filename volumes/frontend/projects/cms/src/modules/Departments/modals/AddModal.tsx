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
    const req = await Api("/departments/action/add").setData({...values}).post();

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

    const req = await Api(`/departments/update/${props.data.id}`).setData({...values}).post();

    if (req.getApiError()) {
      pushBalloon(req.getApiError());
      return;
    } else {
      pushBalloon(lang == 'ru' ? "Запись сохранена" : "Record saved!");
      closeModal();
    }
  }

  const formSchema = new FormSchema()
    .setField({
      name: 'name_ru',
      component: 'input',
      type: 'text',
      label: {ru: 'Имя RU*', en: 'Name RU*'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ],
    })
    .setField({
      name: 'name_en',
      component: 'input',
      type: 'text',
      label: {ru: 'Имя EN*', en: 'Name EN*'},
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ],
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
      status: 'new',
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
