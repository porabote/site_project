import React, {useState, useRef, useContext} from 'react';
import {Form, Field, InputBare, Button, FormContext} from '@/app/form';
import TextEditor from "@/app/text-editor";
import {AuthContext} from "@app/auth-wrapper";
import FormSchema from "@app/form/schema/FormSchema";
import {CommentsContext} from "@app/common/comments/comments";

const CommentForm = (props) => {

  const {user} = useContext(AuthContext);
  const context = useContext(FormContext);
  const {sendComment, fetchComments} = useContext(CommentsContext);

  const [isSubmitReady, setIsSubmitReady] = useState(true);
  const [textAreaHeight, setTextAreaHeight] = useState(110);

  const initValues = {
    ...props.where,
    msg: '',
    name: user.name
  };


  const submitHandler = async (context) => {

    setIsSubmitReady(true);
    const res = await sendComment(context);
    if (res.error != undefined) {
      alert(res.error);
    }
    fetchComments();
  }

  const formShema = new FormSchema().setSubmit(submitHandler)

  const textariaId = Math.random();

  return (
    <Form
      schema={formShema}
      initValues={initValues}
    >
      <div className="comments__form">

        <div className="comments__form__input-couple__wrap">
          <span className="comments__form__input-couple__item__label first">
            <Field>
              <InputBare
                name="name"
                readOnly=""
                value={user.name}
                placeholder="Ваше имя"
                className="comments__form__input-couple__item first"
              />
            </Field>
          </span>

          <div style={{minHeight: `${textAreaHeight}px`}}>
            <TextEditor name="msg"/>
          </div>

        </div>

        <div className="comments__form__button-panel">

            <Button
              type="submit"
              disabled={!isSubmitReady}
              className="comments__form__button-panel__button send"
              label="Отправить"
            />

          {/*<AlternateEmailOutlinedIcon*/}
          {/*  className="link_with_icon grey"*/}
          {/*  style={{*/}
          {/*    marginRight: '6px',*/}
          {/*  }}*/}
          {/*  onClick={(e) => {*/}
          {/*    //modal.open(<>);*/}
          {/*  }}*/}
          {/*/>*/}
        </div>
      </div>
    </Form>
  );

}

export default CommentForm;
