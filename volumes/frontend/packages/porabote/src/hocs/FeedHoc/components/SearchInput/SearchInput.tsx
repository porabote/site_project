import React, {useContext, useState} from 'react';
import Icon from "@porabote/ui/Icons";
import SearchIcon from "@porabote/ui/Icons/SearchInput/SearchIcon";
import {FeedHocContext} from "@porabote/hocs/FeedHoc";
import SettingsIcon from "@porabote/ui/Icons/base/SettingsIcon";

const SearchInput = (props) => {

  const [isFocused, setIsFocused] = useState(false);
  const {toggleFilters, isFilter, isFiltersOpen} = useContext(FeedHocContext);

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
        <div className={`search-input_title-toggle ${isFiltersOpen ? "active" : ""}`} onClick={toggleFiltersHandle}>
          <Icon fill={isFiltersOpen ? "#346BF6" : "#262632"} size={20}><SettingsIcon/></Icon>
          Фильтр
        </div>
      }
    </div>
  );
};

export default SearchInput;