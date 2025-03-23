import React from 'react';
import "@/resources/styles/slideTwo.less";

const HomePageSlideTwo = (props) => {

  const {isActive, slideKey} = props;

  if (!isActive(slideKey)) {
    return <></>;
  }

  return (
      <>
        <div className="content">

          <div className="content_panel">

            <div className="content_panel_title">
              <h1>Контакты</h1>
            </div>

            <div className="content_panel_tab_panel">
              <p className="content_panel_tab_panel_item" tabindex="0">Норильск</p>
              <p className="content_panel_tab_panel_item" tabindex="0">Москва</p>
              <p className="content_panel_tab_panel_item" tabindex="0">Соликамск</p>
              <p className="content_panel_tab_panel_item" tabindex="0">Хромтау</p>
              <p className="content_panel_tab_panel_item" tabindex="0">Мюльхайм</p>
            </div>

          </div>

          <div className="content_page">
            <div className="content_page__share_contacts">
              <p className="content_page__share_txt">
                Открыты для сотрудничества и готовы реализовать ваши грандиозные проекты.
              </p>
              <p className="content_page__share_txt">
                Мы ценим каждого клиента и стремимся к долгосрочному партнерству.
              </p>


              <p>
                <span className="content_page__share_contacts_txt">Всегда на связи</span>
                <span className="content_page__share_contacts_title">
            8 800 101 01 08
          </span>
              </p>

              <p>
                <span className="content_page__share_contacts_txt">Напишите нам, обязательно ответим</span>
                <span className="content_page__share_contacts_title">
            info@thyssenmining.ru
          </span>
              </p>

            </div>

            <div className="content_page__img"></div>
            <div className="content_page__local_contacts">

              <p>
                <span className="content_page__local_contacts_name">Офис в Москве</span>
                <span className="content_page__local_contacts_txt">Россия, Москва, ул.Петровка 27 оф.48</span>
              </p>
              <p>
                <span className="content_page__local_contacts_name">Телефон</span>
                <span className="content_page__local_contacts_txt">+7 999 090 00 00</span>
              </p>
              <p>
                <span className="content_page__local_contacts_name">Email</span>
                <span className="content_page__local_contacts_txt">mos@thyssenmining.ru</span>
              </p>
              <div className="content_page__local_contacts_map"></div>

            </div>
          </div>

        </div>
      </>
  );
};

export default HomePageSlideTwo;