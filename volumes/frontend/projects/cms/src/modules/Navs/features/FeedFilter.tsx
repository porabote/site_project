import React, {useContext} from 'react';
import {InputDate, Select, Input, Button, Checkbox} from "@porabote/ui/Form";
import {FeedHocContext} from "@porabote/hocs/FeedHoc";
import {SearchInput} from "@porabote/hocs/FeedHoc";

const FeedFilter = () => {

  const {
    dicts,
    isFiltersOpen,
    isDictsLoaded,
    setFilter,
    fetchData,
  } = useContext(FeedHocContext);

  const onChangeSearchInput = (e, {value}) => {
    setFilter('orWhere', {name: {operand: 'like', value}, phone: {operand: 'LIKE', value}});
  }

  if (!isDictsLoaded) {
    return <div>loading</div>;
  }

  const {
    managers,
  } = dicts;

  return (
    <>
      <div className="feed-widget__search-panel">
        <SearchInput onChange={onChangeSearchInput} placeholder="Найти гостя по имени или телефону"/>
      </div>

      <div className={`feed-widget_filter-wrap ${isFiltersOpen ? "active" : ""}`}>

        <div className="feed-widget_filter-wrap__fieldset" style={{gridTemplateColumns: "18% 18% 18% 18% 18%"}}>
          <Select
            classModifier="filter-min"
            isEmpty={true}
            name="manager_id"
            onSelect={(e, props) => {
              setFilter('where', {manager_id: props.newValue});
            }}
            data={[]}
            inputElement="div"
            label="Менеджер:"/>



          {/*<div className="filter__date-between-block">*/}
          {/*  <InputDate name="whereBetween.payments.period.from" classModifier="filter-min" label="Период трат с"/>*/}
          {/*  <InputDate name="whereBetween.payments.period.to" classModifier="filter-min" label="по"/>*/}
          {/*</div>*/}



        </div>

        <div className="feed-widget_filter-wrap__fieldset" style={{gridTemplateColumns: "18% 18% 22% 16% 16%", paddingTop: '10px'}}>


          <div className="filter__date-between-block">
            <InputDate
              onSelect={(props) => {
                setFilter('whereBetween', {created_at: {period: {from: props.newValue}}});
              }}
              name="whereBetween.created_at.period.from"
              classModifier="filter-min" label="Поступила с"/>
            <InputDate
              onSelect={(props) => {
                setFilter('whereBetween', {created_at: {period: {to: props.newValue}}});
              }}
              classModifier="filter-min"
              label="по"/>
          </div>


          <div className="filter__date-between-block">
            <InputDate
              onSelect={(props) => {
                setFilter('whereBetween', {created_at: {period: {from: props.newValue}}});
              }}
              name="whereBetween.created_at.period.from"
              classModifier="filter-min" label="Посещение с"/>
            <InputDate
              onSelect={(props) => {
                setFilter('whereBetween', {created_at: {period: {to: props.newValue}}});
              }}
              classModifier="filter-min"
              label="по"/>
          </div>

          <div></div>

          <div className="flex-center">
            <Button onClick={() => fetchData({dropData: true})} label="Найти" class="prb-button filter_btn"/>
          </div>
          <div className="flex-center">
            <Button class="prb-button filter_btn" label="Очистить"/>
          </div>

        </div>



      </div>
    </>);
};

export default FeedFilter;