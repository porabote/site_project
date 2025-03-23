import React, { useState } from "react";
import moment from "moment";
import AnswerForm from "./answer-form";
import CommentListItemAnswer from "./comment-list-item-answer";
import avatar from "./svg/user_no-photo.svg";

const CommentListItem = (props) => {
  const [isAnswerFormActive, setIsAnswerFormActive] = useState(false);

  const showAnswerForm = () => {
    setIsAnswerFormActive(true);
  };

  return (
    <div className="comments__item">
      <div className="comments__item-avatar">
        <div
          className="comments__item-avatar-img"
          style={{ backgroundImage: `url(${avatar})` }}
        ></div>
      </div>
      <div className="comments__item-fio">
        <span className="comments__item-fio__sender">{`${props.data.user ? props.data.user.name : 'No name'}`}</span>
        <span className="comments__listener-fio hide"></span>
      </div>
      <div className="comments__item-date">
        <time>
          {moment(props.data.created_at).format("DD MMM YYYY в hh:mm")}
        </time>
      </div>
      <div
        className="comments__item-title"
        dangerouslySetInnerHTML={{ __html: props.data.msg }}
      ></div>

      <div className="comments__item-response">
        <div
          className="comments__item-response-link"
          onClick={() => {
            showAnswerForm();
          }}
        >
          Ответить
        </div>

        <div className="comments__item-response-form">
          <AnswerForm
            parentMsg={props.data}
            isAnswerFormActive={isAnswerFormActive}
          />
        </div>

        <div className="comments__item__sub-items container sub comments__item__childs-container">
          {props.answers.map((item, index) => (
            <CommentListItemAnswer
              key={index}
              data={{
                user: item.relationships.user,
                ...item,
              }}
              parentMsg={props.data}
              parentGroups={props.parentGroups}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentListItem;
