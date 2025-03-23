import React, {createContext} from 'react';
import {NavsType} from "./NavsTypes";

const initialValues: NavsType = {
  data: [],
  setNavs: Function,
};

export default createContext(initialValues);
