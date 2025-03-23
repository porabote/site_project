export type PropsType = {
  fetchData: (props: {dropData?: boolean}) => any,
  records: {[key: string]: any};
  children?: React.ReactNode;
  modelName: string;
  relations?: string[];
  setDicts?: Function;
  greedMap?: any[];
  formMap?: any[];
  filterMap?: any[];
  isFilter?: boolean;
  isFiltersOpen?: boolean;
  filterDefault?: { [key: string]: any }
  orderBy: [string, string];
  dicts: {[key: string]: any}
  record: {[key: string]: any}
  setRecord: Function;
  filter: FilterType;
  isDictsLoaded?: boolean;
  setFilter: Function;
  getFilterValue: Function;
}

export type FilterType = {
  where: {[key: string]: any}
  whereBetween: {[key: string]: any}
  whereIn: {[key: string]: any}
  orWhere: {[key: string]: any}
  orWhereGrouped: {[key: string]: any}
  custom: {[key: string]: any}
}