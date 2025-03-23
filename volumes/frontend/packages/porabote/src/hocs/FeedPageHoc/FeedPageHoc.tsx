import React, {useState, useEffect, useRef, useContext} from "react";
import ObjectMapper from "@porabote/helpers/ObjectMapperHelper";
import Api, {ResponseType} from "@porabote/api";
import {FeedPagePropsType} from "./types/FeedPageHocTypes";
import FeedPageHocContext from "./FeedPageHocContext";
import {FormContext} from "@porabote/ui/Form";
import "./assets/FeedPageHoc.less";

const FeedPageHoc = (props: FeedPagePropsType) => {

  const pageRef = useRef(1);

  const [modelName] = useState(props.modelName || null);
  const [records, setRecords] = useState([]);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(props.isFiltersExpanded || false);
  const [relations] = useState(props.relations || []);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [orderBy, setOrderBy] = useState(props.orderBy || {fieldName: 'id', direction: 'DESC'});
  const [greedMap] = useState(props.greedMap || []);

  const {getValue, setValue} = useContext(FormContext);

  useEffect(() => {
    fetchData();
  }, []);

  const toggleFilters = () => {
    setIsFiltersExpanded(!isFiltersExpanded);
  }

  const setFilterHandler = (name: string, value: any, reset = false) => {
    if (!reset) {
      console.log(99);
      setValue(name, ObjectMapper.mergeDeep(getValue(name), value));
      //filter[operand] = ObjectMapper.mergeDeep(filter[operand], value);
    } else {
      setValue(name, value);
    }
    fetchData({reset: true});
  }

  const fetchData: (options?: { reset?: boolean }) => void = (options = {}) => {

    if (props.fetchData) {
      props.fetchData();
      return;
    }

    if (!modelName) {
      return;
    }

    if (options.reset) {
      pageRef.current = 1;
    }

    let orderByValue: {[key: string]: string} = {};
    orderByValue[orderBy.fieldName] = orderBy.direction;

    const data = {
      ...getValue('filter'),
      orderBy: orderByValue,
      limit: 50,
      relations,
      page: pageRef.current,
    };

    Api(`/${modelName}/get`)
      .setData(data)
      .onSuccess((response: ResponseType) => {
        if (options.reset) {
          setRecords([
            ...response.data,
          ]);
        } else {
          setRecords([
            ...records,
            ...response.data,
          ]);
          setIsDataLoading(false);
        }

        setValue('meta', {
          ...getValue('meta'),
          ...response.meta,
        });

        pageRef.current++;
      })
      .post();
  }

  const setPage = (page: number) => {
    pageRef.current = page;
  }

  const setOrder = (fieldNameIn: string) => {
    let {fieldName, direction} = orderBy;

    if (fieldName == fieldNameIn) {
      direction = (direction == "DESC") ? "ASC" : "DESC";
    }
    setOrderBy({fieldName: fieldNameIn, direction});
  }

  return (

      <FeedPageHocContext.Provider value={{
        isFiltersExpanded,
        setFilter: setFilterHandler,
        records,
        fetchData,
        isDataLoading,
        toggleFilters,
        greedMap,
        setOrder,
        //setPage,
      }}>
        {props.children}
      </FeedPageHocContext.Provider>

  );
}

export default FeedPageHoc;