import React, {useState, useEffect, useRef} from "react";
import {Api} from "@porabote";
import {PropsType} from "./types/FeedPageHocTypes";
import FeedPageHocContext from "./FeedPageHocContext";
import FeedPageHocObserver from "./observers/FeedPageHocObserver";
import "./assets/FeedPageHoc.less";

const FeedPageHocContainer = (props: PropsType) => {

  const pageRef = useRef(1);

  const initMeta = {
    count: 0, // total count of records
    limit: 50,
    // offset: 0,
    //page: page,
    perPage: 0, // total count of loaded records
    lastId: 0,
  }

  let filterDefault = {
    where: {},
    whereBetween: {},
    orWhereGrouped: [],
    whereIn: {},
    orWhere: {},
    custom: {},
  }

  const [modelName] = useState(props.modelName || null);
  const [records, setRecords] = useState([]);
  const [dicts, setDicts] = useState({});
  const [isDictsLoaded, setIsDictsLoaded] = useState(false);
  const [meta, setMeta] = useState({...initMeta});
  const [rels, setRels] = useState([]);
  const [filter, setFilter] = useState({...filterDefault});
  const [isFilterInited, setIsFilterInited] = useState(false);
  const [defaultFilterValues, setDefaultFilterValues] = useState({});
  const [isFilter] = useState(typeof props.isFilter != "undefined" ? props.isFilter : true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(props.isFiltersOpen || false);
  const [relations, setRelations] = useState(props.relations || []);
  const [isLoading, setIsLoading] = useState(true);
  const [observer] = useState(new FeedPageHocObserver())

  const [orderBy, setOrderBy] = useState(props.orderBy || ["id", "DESC"]);

  const [filterMap, setFilterMap] = useState(props.filterMap || []);
  const [greedMap, setGreedMap] = useState(props.greedMap || []);
  const [formMap, setFormMap] = useState(props.formMap || []);

  useEffect(() => {
    if (!isFilterInited) {
      initFilter();
      return;
    }
    fetchData();
    fetchDicts();
  }, [isFilterInited]);


  const initFilter = () => {

    if (typeof props.filterDefault == "object") {
      let filterDefault = ObjectMapper.mergeDeep(filter, props.filterDefault);

      setFilter({...filterDefault});
    }

    setIsFilterInited(true);
  }

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  }

  const fetchDicts = async () => {
    if (typeof props.setDicts == "function") {
      const dicts = await props.setDicts();
      setDictsHandle(dicts);
    }
    setIsDictsLoaded(true);
  }

  const setDictsHandle = (data) => {
    setDicts(
      {
        ...dicts,
        ...data,
      }
    );
  }

  const setFilterHandler = (operand: string, value: any, reset = false) => {
    if (!reset) {
      filter[operand] = ObjectMapper.mergeDeep(filter[operand], value);
    } else {
      filter[operand] = value;
    }

    setFilter({...filter});
    fetchData({dropData: true});
  }

  const fetchData = async (options = {}) => {

    if (!isFilterInited) {
      return;
    }

    if (props.fetchData) {
      props.fetchData();
      return;
    }

    if (!modelName) {
      return;
    }

    if (options.dropData) {
      pageRef.current = 1;
    }

    let orderByParam = {};
    orderByParam[orderBy[0]] = orderBy[1];

    const data = {
      ...filter,
      orderBy: orderByParam,
      limit: 50,
      relations,
      page: pageRef.current,
    };

    const req = await Api(`/${modelName}/get`).setData(data).post();

    if (options.dropData) {
      setRecords([
        ...req.response.data,
      ]);
    } else {
      setRecords([
        ...records,
        ...req.response.data,
      ]);
      setIsLoading(false);
    }

    setMeta({
      ...meta,
      ...req.response.meta,
    });

    pageRef.current++;
  }

  const setPage = (page: number) => {
    pageRef.current = page;
  }

  // useEffect(() => {
  //   fetchData({dropData: true});
  // }, [orderBy]);

  const setOrder = (fieldName) => {
    let [field, direction] = orderBy;

    if (field == fieldName) {
      direction = direction == "DESC" ? "ASC" : "DESC";
    }
    setOrderBy([fieldName, direction]);
  }

  return (
    <FeedPageHocContext.Provider value={{
      filter,
      getFilterValue,
      getValue: getFilterValue,
      records,
      dicts,
      setDicts: setDictsHandle,
      isDictsLoaded,
      fetchData,
      isLoading,
      setFilter: setFilterHandler,
      isFilter,
      isFiltersOpen,
      toggleFilters,
      greedMap,
      filterMap,
      formMap,
      meta,
      setPage,
      setOrder,
      observer,
    }}>
      {props.children}
    </FeedPageHocContext.Provider>
  );
}

export default FeedPageHocContainer;