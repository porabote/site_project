import React from "react";
import CommentListItem from "./comment-list-item";

const CommentList = (props) => {
  const parentGroups = {};

  const setNestedList = () => {
    const data = props.data.filter((item, index) => {
      if (item.parent_id !== null) {
        if (typeof parentGroups[item.parent_id] === "undefined") {
          parentGroups[item.parent_id] = [];
        }

        parentGroups[item.parent_id][item.id] = item;
      } else {
        return true;
      }
    });

    data.map((item, index) => {
      item["children"] = [];
      setChildren(item);
    });

    return data;
  };

  const setChildren = (item) => {
    if (typeof parentGroups[item.id] !== "undefined") {
      item.children = parentGroups[item.id];
      parentGroups[item.id].map((child) => {
        setChildren(child);
      });
    }
  };

  if (props.loading)
    return <div className="empty-data">Комментарии загружаются...</div>;

  if (props.data.length == 0) {
    return <div className="empty-data">Комментарии не добавлялись</div>;
  }

  const data = setNestedList();

  return (
    <div className="comments__items">
      {data.map((item, index) => (
        <CommentListItem
          key={index}
          answers={item.children}
          data={{
            user: item.user,
            ...item,
          }}
          parentGroups={parentGroups}
        />
      ))}
    </div>
  );
};

export default CommentList;
