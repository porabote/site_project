import React, {useContext, useState} from "react"
import {Form, Field, TextArea, InputBare, Button} from "@/app/form";
import {AuthContext} from "@app/auth-wrapper";

const AnswerForm = (props) => {

  const {user} = useContext(AuthContext);
  const {parentMsg} = props;

  const [answerTo, setAnswerTo] = useState(parentMsg.user ? parentMsg.user.name : 'No name');
  const [isSubmitReady, setIsSubmitReady] = useState(true);

  const initValues = {
    ...props.where,
    parent_id: props.parentMsg ? props.parentMsg.id : null,
    msg: "",
    name: user ? user.name : 'No name',
  };

  const submit = async (entity) => {
    const model = new props.model(entity.attributes);

    setIsSubmitReady(true);

    let newEntity = CommentsModel.createEntity(entity.attributes);
    let res = await newEntity.save();

   // props.fetchData();
  }

  return (
    <Form
      initValues={initValues}
      onSubmit={submit}
    >
      <div
        className={!props.isAnswerFormActive ? "comments__sub-form hide" : "comments__sub-form"}
      >
        <div className="comments__form__input-couple__wrap">
          <label className="comments__form__input-couple__item__label first">
            <span className="comments__form__listener-fio">{answerTo}</span>
          </label>
          <label>
            <Field>
              <TextArea
                clear={true}
                name="msg"
                placeholder="Напишите ваш комментарий"
                className="comments__form__input-couple__item"
              />
            </Field>
          </label>

        </div>


        <div className="comments__form__button-panel">

          <div className="comments__form__button-panel__buttons">
            <Field>
              <Button
                type="submit"
                label="Отправить"
                disabled={isSubmitReady ? false : true}
                className="comments__form__button-panel__button send"
              />
            </Field>

              <Button
                label="Отменить"
                type="button"
                disabled={isSubmitReady ? false : true}
                className="comments__form__button-panel__button cancel"
              />


          </div>

        </div>
      </div>
    </Form>
  );

}

export default AnswerForm;


