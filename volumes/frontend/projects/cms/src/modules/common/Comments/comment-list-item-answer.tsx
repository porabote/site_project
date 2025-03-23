import React, {useState} from "react";
import moment from "moment";
import AnswerForm from "./answer-form";
import avatar from "./svg/user_no-photo.svg";

const CommentListItemAnswer = (props) => {

  const [isAnswerFormActive, setIsAnswerFormActive] = useState(false)

  const showAnswerForm = () => {
    setIsAnswerFormActive(true);
  };

  const answers = props.parentGroups[props.data.id] || [];

  return (
    <React.Fragment>
      <div className="comments__item">
        <div className="comments__item-avatar">
          <div
            className="comments__item-avatar-img"
            style={{backgroundImage: `url(${avatar})`}}
          ></div>
        </div>
        <div className="comments__item-fio">
            <span className="comments__item-fio__sender">
              {`${props.data.user.name}`}
            </span>
          <span className="comments__listener-fio">
              {`${props.parentMsg.user.name}`}
            </span>
        </div>
        <div className="comments__item-date">
          <time>
            {moment(props.data.date_created).format(
              "DD MMM YYYY в hh:mm",
            )}
          </time>
        </div>
        <div className="comments__item-title">{props.data.msg}</div>

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
              {...state}
            />
          </div>

          <div className="on_comments__item__sub-items container sub on_comments__item__childs-container">
            {answers.map((item, index) => (
              <CommentListItemAnswer
                key={index}
                parentMsg={props.data}
                answers={item.children}
                data={item.attributes}
                parentGroups={props.parentGroups}
              />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}

export default CommentListItemAnswer;
