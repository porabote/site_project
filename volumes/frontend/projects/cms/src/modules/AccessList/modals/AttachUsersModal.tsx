import React, {useContext, useEffect, useState} from 'react';
import Api from "@porabote/api";
import {Form, FormSchema, FormSchemaButtons, FormSchemaFields} from "@porabote/ui/Form";
import {SettingsContext} from "@porabote";
import {ModalContext} from "@porabote/widgets/ModalWidget";

const AttachUsersModal = (props) => {

  const {lang} = useContext(SettingsContext);
  const {closeModal, pushBalloon} = useContext(ModalContext);

  const [usersList, setUsersList] = useState([]);

  const submitHandler = async ({values}) => {

    const user_ids = Array.from(values.user_ids)

    const req = await Api(`/access-lists/action/attachUsers`).setData({access_list_id: props.data.id, user_ids}).post();

    if (req.getApiError()) {
      pushBalloon(req.getApiError());
      return;
    } else {
      pushBalloon('Пользователь прикреплён');
      props.fetchData({dropData: true});
      closeModal();
    }
  }

  const getDicts = async () => {
    const req = await Api("/users/get").get();
    setUsersList(req.response.data);
  }

  useEffect(() => {
    getDicts();
  }, []);

  if (!usersList.length) {
    return <>Загрузка</>;
  }

  const formSchema = new FormSchema()
    .setField({
      name: 'user_ids',
      type: 'select',
      label: {ru: 'Пользователи*', en: 'Users*'},
      component: 'select',
      isEmpty: true,
      isMultiple: true,
      setTagTitle: (value, storage, storageMap) => {
        const record = storage[storageMap.get(value)];
        return `${record.first_name} ${record.sur_name} (${record.post_name})`;
      },
      data: usersList,
      optionTitle: (record) => {
        return `${record['sur_name']} ${record['first_name']} (${record['post_name']})`;
      }
    })
    .setButtons([
      {
        label: {ru: 'Сохранить', en: 'Sign up'},
        class: 'prb-btn-login',
        type: 'submit',
        name: 'login_button',
      }
    ]);

  formSchema.setInitialValues({user_ids: new Set()})

  formSchema.setSubmit(submitHandler)
    .setLang(lang);

  formSchema.setButtons([
    {
      label: {ru: 'Сохранить', en: 'Save'},
      class: 'prb-button blue',
      type: 'submit',
      name: 'login_button',
    }
  ]);

  return (
    <div>

      <div className="box login" style={{width: '500px', margin: '0 auto'}}>

        <div className="box-body">
          <Form schema={formSchema}>
            <FormSchemaFields/>
            <div
              style={{display: 'flex', alignContent: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
              <div style={{padding: "25px 0", width: '140px'}}>
                <FormSchemaButtons/>
              </div>
            </div>
          </Form>
        </div>
      </div>

    </div>
  );
};

export default AttachUsersModal;