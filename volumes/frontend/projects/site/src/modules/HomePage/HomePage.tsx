import React, {useState} from 'react';
import HomeSlide from "@/modules/HomePage/HomeSlides/HomeSlide";
import "@/resources/styles/home-style.less";

const HomePage = () => {

  const [slideClass, setSlideClass] = useState<string>('slide-one');
  const toggleSlideClass = (className) => {
    setSlideClass(className);
  }

  return (
    <div>
      <div className={`main home ${slideClass}`}>

        <div className="header">

          <div className="header_logo">
            <a href="/" className={`logo-link ${slideClass}`}>

            </a>
          </div>

          <div className="header_menu">
            <a className={`header_menu_item ${slideClass}`} href="#">Технологии</a>
            <a className={`header_menu_item ${slideClass}`} href="#">Проекты</a>
            <a className={`header_menu_item ${slideClass}`} href="#">Оборудование</a>
            <a className={`header_menu_item ${slideClass}`} href="#">Партнеры</a>
          </div>

          <div className="header_lang home">
            <div className={`header_lang_item active ${slideClass}`}>РУ</div>
            <div className={`header_lang_item ${slideClass}`}>EN</div>
          </div>
        </div>

        <HomeSlide toggleSlideClass={toggleSlideClass}/>

        <div className="page_pagination_line"></div>
        <div className="page_pagination_reqtxt">
          <p className={`page_pagination_reqtxt_span_main ${slideClass}`}>
                    <span>
                      ИНН 2457066477
                    </span>
            <span>
                      КПП 770701001
                    </span>
          </p>
          <p>
            <img src="https://thyssenmining.ru/images/site/img/image4.svg" width="45"/>
          </p>
          <p className={`page_pagination_reqtxt_span_main ${slideClass}`}>
                    <span>
                    ООО "ТМКИ"
                    </span>
            <span>
                    ОГРН 1082457000999
                    </span>
          </p>
        </div>


        <div className="page_pagination">
          <div className="page_pagination_bar">
            {/*<div className="page_pagination_bar_toggler">*/}
            {/*<div className="page_pagination_bar_toggler_scroll"></div>*/}
            <div className="page_pagination_bar_scr">
              <svg id="scrl-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 38.9">
                <path className="scrl-body"
                      d="M12.8 38.4h-1.6C5.2 38.4.4 33.6.4 27.6V11.2C.4 5.2 5.2.4 11.2.4h1.6c6 0 10.8 4.8 10.8 10.8v16.5c0 5.9-4.8 10.7-10.8 10.7z"/>
                <path className="scrl-wheel"
                      d="M12 13.9a4.2 4.2 0 01-4.2-4.2V4.2C7.8 1.9 9.7 0 12 0c2.3 0 4.2 1.9 4.2 4.2v5.4a4.1 4.1 0 01-4.2 4.3z"/>
              </svg>
            </div>
            {/*</div>*/}
          </div>
          <div className="page_pagination_number">05</div>
          <div className="page_pagination_count">
            <span>07</span>
          </div>
        </div>
      </div>


      {/*<Modal/>*/}
      {/*<Balloon/>*/}

    </div>
  );
};

export default HomePage;