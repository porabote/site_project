import React from 'react';
import FeedHoc from "@porabote/hocs/FeedHoc";
import UsersFeed from "@/modules/Admin/users/features/UsersFeed";

const UsersFeedPage = () => {
  return (
    <div>
      <FeedHoc modelName="users" relations={['departament', 'shift']}>
        <UsersFeed/>
      </FeedHoc>
    </div>
  );
};

export default UsersFeedPage;