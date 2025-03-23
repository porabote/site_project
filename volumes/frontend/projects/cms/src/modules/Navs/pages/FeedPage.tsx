import React from 'react';
import Feed from "../features/Feed";
import FeedHoc from "@porabote/hocs/FeedHoc";

const FeedPage = () => {
  return (
    <div className="feed-page">
      <FeedHoc modelName="navs">
        <Feed/>
      </FeedHoc>
    </div>
  );
};

export default FeedPage;