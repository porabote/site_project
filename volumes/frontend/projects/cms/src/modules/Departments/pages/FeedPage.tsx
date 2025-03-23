import React from 'react';
import DepartmentsFeed from "../features/DepartmentsFeed";
import FeedHoc from "@porabote/hocs/FeedHoc";

const FeedPage = () => {
  return (
    <div className="feed-page">
      <FeedHoc modelName="departments">
        <DepartmentsFeed/>
      </FeedHoc>
    </div>
  );
};

export default FeedPage;