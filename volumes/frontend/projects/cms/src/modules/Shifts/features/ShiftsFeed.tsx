import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {
  FeedHocContext,
  LazyLoadButton,
  Pagination,
  Greed,
} from "@porabote/hocs/FeedHoc";
import Icon, {PlusIcon} from "@porabote/ui/Icons";
import {ModalContext} from "@porabote/widgets/ModalWidget";
import {SettingsContext} from "@porabote";
import {greedMap} from "./ShiftsFeedConfig";
import ShiftsAddModal from "../modals/ShiftsAddModal";

const ShiftsFeed = () => {

  const navigate = useNavigate();

  const {records, fetchData} = useContext(FeedHocContext);
  const {openModal} = useContext(ModalContext);
  const {lang} = useContext(SettingsContext);

  const openAddModal = () => {
    openModal(<ShiftsAddModal fetchData={fetchData} title="Добавление вахты"/>);
  }

  return (
    <div className="feed-widget">
      <div className="feed-widget__top-panel">

        <div className="feed-widget__title">
          <h2>Вахты</h2>
        </div>

        <div className="feed-widget__top-panel_right-part">
          <div className="feed-widget__plus" onClick={openAddModal}>
            <Icon size="12">
              <PlusIcon/>
            </Icon>
            Добавить
          </div>

        </div>

      </div>

      {!records && "Загрузка данных"}

      <Pagination/>
      <Greed
        map={greedMap}
        records={records}
        class="feed striped"
        onClickByRow={(e, props) => navigate(`/shifts/view/${props.record.id}`)}
        >
      </Greed>
      <LazyLoadButton/>

    </div>
  );
};

export default ShiftsFeed;