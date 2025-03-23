import React, {useState, useEffect, useRef} from "react";
import Api from "@porabote/api";
import ObjectMapper from "@porabote/helpers/ObjectMapperHelper";
import {PropsType} from "./FeedHocTypes";
import FeedHocContext from "./FeedHocContext";
import "./FeedHoc.less";
import {response} from "express";
import {ResponseType} from "@porabote/api/ApiTypes";

const FeedHoc = (props: PropsType) => {

  const pageRef = useRef(1);

  const getFilterValue = (valuePath: string) => {
    return ObjectMapper.get(valuePath, filter)
  }

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
  const [filter, setFilter] = useState(null);
  const [isFilterInited, setIsFilterInited] = useState(false);
  const [isFilter] = useState(typeof props.isFilter != "undefined" ? props.isFilter : true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(props.isFiltersOpen || false);
  const [relations] = useState(props.relations || []);
  const [isLoading, setIsLoading] = useState(true);

  const [orderBy, setOrderBy] = useState(props.orderBy || ["id", "DESC"]);

  const [filterMap, setFilterMap] = useState(props.filterMap || []);
  const [greedMap, setGreedMap] = useState(props.greedMap || []);
  const [formMap, setFormMap] = useState(props.formMap || []);

  useEffect(() => {
    initFilter();
  }, []);

  useEffect(() => {
    fetchData();
  }, [isFilterInited]);

  const initFilter = () => {
    if (typeof props.filterDefault == "object") {
      let initFilter = ObjectMapper.mergeDeep({...filterDefault}, props.filterDefault);
      setFilter({...initFilter});
    } else {
      setFilter({...filterDefault});
    }

    setIsFilterInited(true);
  }

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
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

  const fetchData = async (options: { dropData?: boolean } = {}) => {
    if (!isFilterInited || !filter) {
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

    Api(`/${modelName}/get`)
      .setData(data)
      .onSuccess((response: ResponseType) => {
        if (options.dropData) {
          setRecords([
            ...response.data,
          ]);
        } else {
          setRecords([
            ...records,
            ...response.data,
          ]);
          setIsLoading(false);
        }

        setMeta({
          ...meta,
          ...response.meta,
        });

        pageRef.current++;
      })
      .post();
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
    <FeedHocContext.Provider value={{
      filter,
      isFilterInited,
      getFilterValue,
      getValue: getFilterValue,
      records,
      dicts,
      // setDicts: setDictsHandle,
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
    }}>
      {props.children}
    </FeedHocContext.Provider>
  );
}

export default FeedHoc;