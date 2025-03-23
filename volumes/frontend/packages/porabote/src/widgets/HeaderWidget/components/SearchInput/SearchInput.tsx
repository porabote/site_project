import React, {useContext, useState} from 'react';
import Icon from "../Icons";
import SearchIcon from "@/app/ui/icons/search-input/SearchIcon";
import {DataSourceContext} from "@/app/data-source/data-source-wrapper";
import SettingsIcon from "@app/ui/icons/base/SettingsIcon";

const SearchInput = (props) => {

  const [isFocused, setIsFocused] = useState(false);
  const {toggleFilters, isFilter, isFiltersOpen} = useContext(DataSourceContext);

  const onFocusHandle = () => {
    setIsFocused(true);
  }

  const onBlurHandle = () => {
    setIsFocused(false);
  }

  const onChangeHandle = (e) => {
    props.onChange(e, {value: e.target.value});
  }

  const toggleFiltersHandle = () => {
    toggleFilters();
  }

  return (
    <div className={`search-input-wrap ${isFocused ? "focused" : ""}`}>
      <input onFocus={onFocusHandle} onBlur={onBlurHandle} onChange={onChangeHandle} className="search-input-input" placeholder={props.placeholder || ""}/>
      <div className="search-input-icon">
        <Icon size={20} fill="#c3c5c5">
          <SearchIcon/>
        </Icon>
      </div>
      {isFilter &&
        <div className={`feed_page__title-toggle ${isFiltersOpen ? "active" : ""}`} onClick={toggleFiltersHandle}>
          <Icon fill={isFiltersOpen ? "#346BF6" : "#262632"} size={20}><SettingsIcon/></Icon>
          Фильтр
        </div>
      }
    </div>
  );
};

export default SearchInput;