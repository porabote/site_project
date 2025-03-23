import React from "react";

export type FeedPagePropsType = {
  isFiltersExpanded?: boolean;
  modelName: string;
  relations?: string[];
  greedMap?: {[key: string]: any};
  filterInit?: { [key: string]: any };
  orderBy?: {fieldName: string, direction: string};
  children?: React.ReactNode;
  fetchData?: Function;
}

export type FeedPageHocContextType = {
  isFiltersExpanded: boolean,
  isDataLoading: boolean,
  records: any[],
  greedMap: {[key: string]: any},
  fetchData: Function,
  setFilter: Function,
  toggleFilters: Function,
  setOrder: Function,
}