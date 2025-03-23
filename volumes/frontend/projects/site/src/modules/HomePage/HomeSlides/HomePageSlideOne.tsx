import React from 'react';
import "@/resources/styles/slideOne.less";

const HomePageSlideOne = (props) => {

  const {isActive, slideKey} = props;

  if (!isActive(slideKey)) {
    return <></>;
  }

  return (
      <>
      <div className="home_slogan">
        <p><span>Т</span>ИССЕН</p>
        <p><span>М</span>АИНИНГ</p>
        <p><span>К</span>ОНСТРАКШН</p>
        <p><span>И</span>СТ</p>
      </div>
      <div className="video-container">
        <video autoPlay muted loop>
          <source src="https://thyssenmining.ru/images/site/img/video1.mp4" type="video/mp4"/>
          Ваш браузер не поддерживает тег video.
        </video>
      </div>
      </>
          );
};

export default HomePageSlideOne;