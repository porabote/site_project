import React, {useState, useEffect, useContext} from "react";
import Row from "./Row";
import "./Table.less";
import TableContext from "./TableContext";
import {FeedHocContext} from "@porabote/hocs/FeedHoc";

type propsTypes = {
  children: JSX.Element[] | JSX.Element;
  class?: string;
  gridTemplateColumns: string;
  floatFirstColumn?: boolean;
  floatFirstRow?: boolean;
  tableKey?: any;
}

const Table = (props: propsTypes) => {

  const [tableKey, setTableKey] = useState(Math.random());

  const refreshTable = () => {
    setTableKey(Math.random());
  }

  const initContextValues = {
    refreshTable,
    tableProps: {...props},
  };

  return (
    <TableContext.Provider value={initContextValues}>
      <div className={props.class ? `prb-table ${props.class}` : `prb-table`}>
        {React.Children.map(props.children, (child, index) => {
          if (child === null) return ;
          return React.cloneElement(child, {
            refreshTable,
            ...props,
            ...child.props,
            index,
          });
        })}
    </div>
    </TableContext.Provider>
  );
}

export default Table;