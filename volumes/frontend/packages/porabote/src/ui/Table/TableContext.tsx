import React, {createContext} from 'react';
import {TableContextType} from "./TableTypes";

const initValues = {
  refreshTable: Function,
  tableProps: {},
};

const TableContext: React.Context<TableContextType> = createContext<TableContextType>(initValues);

export default TableContext;