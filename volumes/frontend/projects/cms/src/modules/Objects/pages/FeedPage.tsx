import React from 'react';
import ObjectsFeed from "../features/ObjectsFeed";
import FeedHoc from "@porabote/hocs/FeedHoc";

const FeedPage = () => {
  return (
    <div className="feed-page">
      <FeedHoc modelName="departments-objects">
        <ObjectsFeed/>
      </FeedHoc>
    </div>
  );
};

export default FeedPage;