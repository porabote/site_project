import React, { useEffect, useState } from "react";
import HistoryItem from "porabote/history/history-item";
import moment from "moment";

const History = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await props.fetchData();
    setData(data.data);
  }

  const count = Object.keys(data).length;

  return (
    <div className="comments">
      <div className="comments__title sidebar-box-up">
        <span>История ({count})</span>
      </div>
      {data.map((item, index) => (
        <HistoryItem
          key={index}
          msg={item.attributes.msg}
          user={item.attributes.user_name}
          datetime={moment(
            item.attributes.created_at || item.attributes.date_created,
          ).format("DD MMM YYYY HH:mm")}
        />
      ))}
    </div>
  );
};

export default History;
