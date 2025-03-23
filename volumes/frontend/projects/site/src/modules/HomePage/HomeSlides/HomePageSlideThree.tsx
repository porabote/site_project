import React from 'react';
import "@/resources/styles/slideThree.less";

const HomePageSlideThree = (props) => {

  const {isActive, slideKey} = props;

  if (!isActive(slideKey)) {
    return <></>;
  }

  return (
    <>
      <div className="content">
333333333333333333333
          
      </div>
    </>
  );
};

export default HomePageSlideThree;