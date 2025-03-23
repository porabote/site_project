import React, {useState, useEffect, createContext} from "react";
import CommentForm from "./comment-form";
import CommentList from "./comment-list";
import "./comments.less";

type CommentsProps = {
  recordId: number;
  businessEventId: number;
  modelName: string;
};

export const CommentsContext = createContext({
  sendComment: (context) => {
  },
});

const Comments = (props: CommentsProps) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const data = await props.fetchComments();
    setData(data);
    setLoading(false);
  }

  return (
    <CommentsContext.Provider value={{
      fetchComments,
      sendComment: props.sendComment,
    }}>
      <div className="comments">

        <div className="comments__title">Комментарии <span>({data.length})</span></div>

        <CommentForm {...props}/>
        <CommentList
          where={props.where}
          data={data}
          loading={loading}
        />
      </div>
    </CommentsContext.Provider>
  );

};

export default Comments;
