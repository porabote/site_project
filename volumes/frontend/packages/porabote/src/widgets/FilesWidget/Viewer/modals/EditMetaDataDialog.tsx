import React, {useContext} from "react";
import {Form, FormSchemaFields, FormSchemaButtons, FormSchema} from "@porabote/ui/Form";
import Api, {ResponseType} from "@porabote/api";
import {ModalContext} from "@porabote";


const EditMetaDataDialog = (props) => {

  const {pushBalloon, closeModal} = useContext(ModalContext);

  const {fetchData} = props;

  const submitHandler = ({values}) => {

    Api("/files/action/editMetaData")
      .setData({...values})
      .onSuccess(resp => {
        pushBalloon('Данные сохранены');
        fetchData();
        closeModal();
      })
      .onApiError(error => {
        pushBalloon(error);
      })
      .post();
  }

  const deletePhoto = async () => {

    const res = await Api("/files/action/delete")
      .setData({id: props.record.id})
      .onSuccess((resp: ResponseType) => {
        pushBalloon('Данные обновлены');
        closeModal();
      })
      .onApiError(error => {
        pushBalloon(error);
      })
      .post();
  }

  let formSchema = new FormSchema()
    .setField({
      name: 'alt',
      type: 'text',
      label: {ru: 'Описание файла*', en: 'Descr*'},
      component: 'input',
      rules: [
        {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
      ],
    })
    // .setField({
    //   name: 'cover_flg',
    //   label: {ru: 'Обложка*', en: 'Cover*'},
    //   component: 'checkbox',
    // })
    .setButtons([
      {
        label: {ru: 'Сохранить', en: 'Save'},
        class: 'prb-button blue',
        type: 'submit',
        name: 'login_button',
      }
    ]);

  if (props.record) {
    formSchema.setInitialValues(props.record);
  }

  formSchema.setSubmit(submitHandler);

  return (
    <div className="box" style={{width: '540px', margin: '0 auto'}}>
      <div className="box-body">
        <Form schema={formSchema}>
          <FormSchemaFields/>
          <div style={{padding: "25px 0"}}>
            <FormSchemaButtons/>
          </div>
        </Form>

        {/*<p style={{color: '#ef4a9d', cursor: "pointer", textAlign: 'center'}} onClick={() => deletePhoto()}>Удалить</p>*/}

      </div>
    </div>
  );
};

export default EditMetaDataDialog;
