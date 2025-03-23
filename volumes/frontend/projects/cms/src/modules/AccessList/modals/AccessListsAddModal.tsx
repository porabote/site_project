import React, {useContext} from "react";
import {
  Form,
  FormSchemaFields,
  FormSchemaButtons,
  FormSchema,
} from "@porabote/ui/Form";
import {AuthContext} from "@porabote/middlewares/Auth";
import Api from "@porabote/api";
import {ModalContext} from "@porabote/widgets/ModalWidget";


const AccessListsAddModal = (props) => {

  const {closeModal, pushBalloon} = useContext(ModalContext);

  const submitHandler = async ({values}) => {

    const req = await Api("/access-lists/action/add/").setData({...values}).post();

    if (req.getApiError()) {
      pushBalloon(req.getApiError());
      return;
    }

    pushBalloon('Запись сохранена');
    props.fetchData({dropData: true})
    closeModal();
  }


  let formSchema = new FormSchema().setField({
    name: 'name',
    label: {ru: 'Название/описание списка доступа*', en: 'List name*'},
    component: 'input',
    rules: [
      {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
    ],
  })
    .setSubmit(submitHandler)
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

export default AccessListsAddModal;
