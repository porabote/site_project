import React from 'react';
import FeedHoc from "@porabote/hocs/FeedHoc";
import AccessListsFeed from "@/modules/AccessList/features/AccessListsFeed";

const AccessListFeedPage = () => {
  return (
    <div>
      <FeedHoc modelName="access-lists">
        <AccessListsFeed/>
      </FeedHoc>
    </div>
  );
};

export default AccessListFeedPage;