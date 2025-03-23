import React, {useContext, useEffect, useState} from "react";
import {SettingsContext} from "@porabote/middlewares/Settings";
import {Form, FormSchema, FormSchemaButtons, FormSchemaFields} from "@porabote/ui/Form";
import Api from "@porabote/api";
import {ModalContext} from "@porabote/widgets/ModalWidget";
import moment from "moment";


const AddStepDialog = (props) => {

    const {label, recordId, updateData} = props;

    const [users, setUsers] = useState([]);
    const [isInner, setIsInner] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        Api("/users/get").onSuccess((resp) => {
                setUsers(resp.data);
            })
            .get();
    }

    const {lang} = useContext(SettingsContext);
    const {closeModal, pushBalloon} = useContext(ModalContext);

    const submitHandler = ({values}) => {

        Api("/AcceptListsSteps/action/add")
            .setData({
                ...values,
                label,
                record_id: recordId,
            })
            .onSuccess(resp => {
                updateData();
                console.log(88);
                closeModal();
            })
            .onApiError(error => {
                pushBalloon(error);
            })
            .post();
    }

    const formSchema = new FormSchema()
        .setField({
            name: 'is_outside',
            type: 'select',
            label: {ru: 'Тип сотрудника*', en: 'Type*'},
            component: 'select',
            inputElement: 'div',
            isEmpty: false,
            onSelect: (e, {newValue}) => {
                setIsInner(newValue != 1);
            },
            data: [
                {id: 0, name: 'Внутренний'},
                {id: 1, name: 'Внешний'},
            ],

            // rules: [
            //     {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
            // ],
        })
        .setButtons([
            {
                label: {ru: 'Сохранить', en: 'Save'},
                class: 'prb-button blue',
                type: 'submit',
                name: 'login_button',
            }
        ]);

    if (isInner) {
        formSchema.setField({
            name: 'user_id',
            type: 'select',
            label: {ru: 'Пользователь*', en: 'User*'},
            component: 'select',
            isEmpty: true,
            data: [...users],
            optionTitle: (record) => {
                return `${record.sur_name} ${record.first_name} - ${record.post_name}`;
            },
            // rules: [
            //     {type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},
            // ],
        })
    }

    if (!isInner) {
        formSchema.setField({
            name: 'email',
            label: {ru: 'Email*', en: 'Email*'},
            component: 'input',
            //  rules: [{type: 'required', prompt: {ru: 'Поле обязатeльно для заполнения', en: 'Field required'}},],
        })
    }

    formSchema.setInitialValues({
        is_outside: "0",
    })

    formSchema.setLang(lang);
    formSchema.setSubmit(submitHandler);

    return (
        <div className="box login" style={{width: '740px', margin: '0 auto'}}>

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

export default AddStepDialog;
