import React, {useEffect, useRef, useState} from 'react';
import {SliderItem} from "@/app/slider";
import {Slider} from "@/app/slider";

const ContentSlider = (props) => {

  const sliderContainer = useRef(null);
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  if (typeof data != "object") {
    return <p></p>;
  }

  return (
    <div ref={sliderContainer} className="page-image-gallery" id="speakers">

      <div className="page-image-gallery__container">

        {/*<SpeakersFade data={props.data}></SpeakersFade>*/}

        <Slider container={sliderContainer}>
          {data.map((file, index) => {

          //  let avatar = (file) ? `url("${file.uri}")` : '';

            return <SliderItem key={index} data={file}>

              <div className="prb-slider__item-text">
                <div className="prb-slider__item-text__fio">{file.title}</div>
                {/*<div className="prb-slider__item-text__desc">{file.post_name}</div>*/}
              </div>

            </SliderItem>
          })}
        </Slider>
      </div>

    </div>
  );
};

export default ContentSlider;