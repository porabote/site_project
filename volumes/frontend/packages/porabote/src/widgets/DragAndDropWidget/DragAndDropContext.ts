import React, {createContext} from 'react';
import {DragAndDropContextType} from "./DragAndDropTypes";

const initialAuth: DragAndDropContextType = {
  records: [],
  dragItemRef: null,
  dragOverItemRef: null,
  handleSort: Function,
  onDragEnd: Function,
  dicts: {},
  renderItemTitle: Function,
};

export default createContext(initialAuth);