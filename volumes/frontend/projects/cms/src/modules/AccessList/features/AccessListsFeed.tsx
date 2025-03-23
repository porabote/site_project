import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import moment from "moment";
import {
  FeedHocContext,
  LazyLoadButton,
  Pagination,
  Greed,
  GreedColumn,
  GreedRow, SearchInput
} from "@porabote/hocs/FeedHoc";
import Icon, {PlusIcon} from "@porabote/ui/Icons";
import AddModal from "../modals/AccessListsAddModal";
import {ModalContext} from "@porabote/widgets/ModalWidget";
import {SettingsContext} from "@porabote";
import FeedFilter from "./AccessListsFeedFilter";
import {greedMap} from "./AccessListsFeedConfig";

const Feed = () => {

  const {records, fetchData, setFilter} = useContext(FeedHocContext);
  const {openModal} = useContext(ModalContext);
  const {lang} = useContext(SettingsContext);

  const openAddModal = () => {
    openModal(<AddModal title="Добавление" fetchData={fetchData}/>);
  }

  const onChangeSearchInput = (e, {value}) => {
    setFilter('orWhere', {
      name: {operand: 'like', value},
      surname: {operand: 'like', value},
      email: {operand: 'LIKE', value}
    });
  }

  return (
    <div className="feed-widget">
      <div className="feed-widget__top-panel">

        <div className="feed-widget__title">
          <h2>Списки доступа</h2>
        </div>

        <div className="feed-widget__top-panel_right-part">
          <div className="feed-widget__plus" onClick={openAddModal}>
            <Icon size="12">
              <PlusIcon/>
            </Icon>
            Добавить
          </div>

          <div className="feed-widget__search-panel">
            <SearchInput onChange={onChangeSearchInput} placeholder="Найти по названию"/>
          </div>
        </div>

      </div>
      <FeedFilter/>

      {!records && "Загрузка данных"}

      <Pagination/>
      <Greed map={greedMap} linkTo="/access-lists/view/:id" class="feed striped">
      </Greed>
      <LazyLoadButton/>

    </div>
  );
};

export default Feed;