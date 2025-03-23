import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import moment from "moment";
import {
  FeedHocContext,
  LazyLoadButton,
  Pagination,
  Greed,
  GreedColumn,
  GreedRow
} from "@porabote/hocs/FeedHoc";
import Icon, {EditIcon, PlusIcon} from "@porabote/ui/Icons";
import AddModal from "../modals/AddModal";
import {ModalContext} from "@porabote/widgets/ModalWidget";
import {SettingsContext} from "@porabote";
import FeedFilter from "../features/FeedFilter";
import {greedColumns} from "./FeedConfig";

const Feed = () => {

  const {records, fetchData} = useContext(FeedHocContext);
  const {openModal} = useContext(ModalContext);
  const {lang} = useContext(SettingsContext);

  const openAddModal = (record = null) => {
    openModal(<AddModal fetchData={fetchData} record={record} title="Регистрация гостя"/>);
  }

  return (
    <div className="feed-widget">
      <div className="feed-widget__top-panel">

        <div className="feed-widget__title">
          <h2>Навигация</h2>
        </div>

        <div className="feed-widget__plus" onClick={() => openAddModal()}>
          <Icon size="12">
            <PlusIcon/>
          </Icon>
          Добавить
        </div>

      </div>
      {/*<FeedFilter/>*/}

      {!records && "Загрузка данных"}

      <Pagination/>
      <Greed map={greedColumns} records={records} class="feed striped" lingTo="/navs/view/:id">

        <GreedColumn name="id" render={(record) => {
          return(
            <Icon size={16} fillHover="#E6008A" onClick={() => openAddModal(record)}>
              <EditIcon className="link_with_icon__icon"/>
            </Icon>
          );
        }}/>

        <GreedColumn name="name_ru" render={(record) => record.name_ru}/>

        <GreedColumn name="link" render={(record) => record.link}/>
        <GreedColumn name="parent_id" render={(record) => record.parent_id}/>
        <GreedColumn name="created_at" render={(record) => record.created_at}/>
      </Greed>
      <LazyLoadButton/>

    </div>
  );
};

export default Feed;