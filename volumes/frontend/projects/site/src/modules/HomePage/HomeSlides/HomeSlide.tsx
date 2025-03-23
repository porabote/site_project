import React, {useState} from 'react';
import HomePageSlideOne from "./HomePageSlideOne";
import HomePageSlideTwo from "./HomePageSlideTwo";
import HomePageSlideThree from "./HomePageSlideThree";
import HomePageSlideFour from "./HomePageSlideFour";

const HomeSlide = (props) => {

  const {toggleSlideClass} = props;

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const isActive = (index: any) => index === activeSlideIndex;

  const toggleSlide = (index, className) => {
    setActiveSlideIndex(index);
    toggleSlideClass(className);
  }

  return (
    <div>
        <div style={{border: '1px solid red', position: 'absolute'}}>
            <div onClick={() => toggleSlide(0, 'slide-one')}>1</div>
            <div onClick={() => toggleSlide(1, 'slide-two')}>2</div>
            <div onClick={() => toggleSlide(2, 'slide-three')}>3</div>
            <div onClick={() => toggleSlide(3, 'slide-four')}>4</div>
        </div>
        <HomePageSlideOne class="home-slide-one" isActive={isActive} slideKey={0}/>
      <HomePageSlideTwo class="home-slide-two" isActive={isActive} slideKey={1}/>
      <HomePageSlideThree class="home-slide-three" isActive={isActive} slideKey={2}/>
        <HomePageSlideThree class="home-slide-four" isActive={isActive} slideKey={3}/>
    </div>
  );
};

export default HomeSlide;