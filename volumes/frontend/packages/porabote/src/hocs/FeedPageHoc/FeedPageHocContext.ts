import {createContext} from "react";
import {FeedPageHocContextType} from "./types/FeedPageHocTypes";

const initialState: FeedPageHocContextType = {
  isDataLoading: false,
  isFiltersExpanded: false,
  modelName: 'test',
  records: [],
  filterMap: [],
  greedMap: [],
  formMap: [],
  fetchData: Function,
  setFilter: Function,
  getFilterValue: Function,
  setOrder: Function,
  toggleFilters: Function,
};

export default createContext(initialState);