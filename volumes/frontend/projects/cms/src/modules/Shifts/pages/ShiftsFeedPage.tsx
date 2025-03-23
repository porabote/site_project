import React from 'react';
import FeedHoc from "@porabote/hocs/FeedHoc";
import ShiftsFeed from "../features/ShiftsFeed";

const ShiftsFeedPage = () => {
  return (
    <div>
      <FeedHoc relations={['head_user']} modelName="shifts">
        <ShiftsFeed/>
      </FeedHoc>
    </div>
  );
};

export default ShiftsFeedPage;