import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
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
import AddModal from "../modals/AddModal";
import {ModalContext} from "@porabote/widgets/ModalWidget";
import {SettingsContext} from "@porabote";
import FeedFilter from "../features/UsersFeedFilter";
import {greedMap} from "./UsersFeedConfig";

const Feed = () => {

  const navigate = useNavigate();

  const {records, fetchData, setFilter} = useContext(FeedHocContext);
  const {openModal} = useContext(ModalContext);
  const {lang} = useContext(SettingsContext);

  const openAddModal = () => {
    openModal(<AddModal title="Регистрация пользователя" fetchData={fetchData}/>);
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
          <h2>Пользователи</h2>
        </div>

        <div className="feed-widget__top-panel_right-part">
          <div className="feed-widget__plus" onClick={openAddModal}>
            <Icon size="12">
              <PlusIcon/>
            </Icon>
            Добавить
          </div>

          <div className="feed-widget__search-panel">
            <SearchInput onChange={onChangeSearchInput} placeholder="Найти пользователя по имени или email"/>
          </div>
        </div>

      </div>
      <FeedFilter/>

      {!records && "Загрузка данных"}

      <Pagination/>
      <Greed map={greedMap} onClickByRow={(e, {record}) => navigate(`/admin/users-profile/${record.id}`)} records={records} class="feed striped">
        <GreedColumn name="email"/>
        <GreedColumn name="name"/>
        <GreedColumn name="created_at" render={(record) => moment(record.created_at).format("DD-MM-YYYY HH:mm")}/>
        <GreedColumn name="updated_at" render={(record) => moment(record.updated_at).format("DD-MM-YYYY HH:mm")}/>
      </Greed>
      <LazyLoadButton/>

    </div>
  );
};

export default Feed;