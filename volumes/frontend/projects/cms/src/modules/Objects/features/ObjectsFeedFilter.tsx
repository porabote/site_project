import React, {useContext} from 'react';
import {InputDate, Select, Input, Button, Checkbox} from "@porabote/ui/Form";
import {FeedHocContext} from "@porabote/hocs/FeedHoc";
import {SearchInput} from "@porabote/hocs/FeedHoc";

const ObjectsFeedFilter = () => {

  const {
    dicts,
    isFiltersOpen,
    isDictsLoaded,
    setFilter,
    fetchData,
  } = useContext(FeedHocContext);

  if (!isDictsLoaded) {
    return <div>loading</div>;
  }

  const {
    clubs,
    levels,
  } = dicts;

  return (
    <>
      <div className={`feed-widget_filter-wrap ${isFiltersOpen ? "active" : ""}`}>

        <div className="feed-widget_filter-wrap__fieldset"
             style={{gridTemplateColumns: "15% 15% 20% 20% 20%", paddingTop: '10px'}}>
          <div>
            <Checkbox name="where.block_flg" label="Черный список" />
          </div>

          <div className="flex-center">
            <Button onClick={() => fetchData()} label="Найти" class="prb-button filter_btn"/>
          </div>
          <div className="flex-center">
            <Button class="prb-button filter_btn" label="Очистить"/>
          </div>
        </div>

      </div>
    </>);
};

export default ObjectsFeedFilter;