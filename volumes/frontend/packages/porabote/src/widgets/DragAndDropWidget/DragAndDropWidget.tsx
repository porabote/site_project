import React, {useState, useCallback, useRef, useEffect} from 'react';
import DragAndDropItem from "./DragAndDropItem";
import DragAndDropContext from "./DragAndDropContext";

const DragAndDropWidget = (props) => {

  if (props.records.length == 0) return <div></div>;

  const [records, setRecords] = useState([...props.records]);

  const dragItemRef = useRef(null);
  const dragOverItemRef = useRef(null);

  const handleSort = (e) => {
    let _items = [...records];
    const draggedItem = _items.splice(dragItemRef.current, 1)[0];

    const indexDelta = (dragItemRef.current > dragOverItemRef.current) ?
      dragOverItemRef.current - dragItemRef.current : dragOverItemRef.current - dragItemRef.current;

    props.onDragEnd(draggedItem.lft, indexDelta);

    _items.splice(dragOverItemRef.current, 0, draggedItem)[0];
    dragItemRef.current = null;
    dragOverItemRef.current = null;

    setRecords(_items);
  }

  return (
    <DragAndDropContext.Provider value={{
      records,
      dragItemRef,
      dragOverItemRef,
      handleSort,
      onDragEnd: props.onDragEnd,
      dicts: props.dicts,
      renderItemTitle: props.renderItemTitle,
    }}>
      <div className="drag-and-drop-list">
        {records.map((record, index) => {
          return <DragAndDropItem
            index={index}
            key={index}
            lft={record.lft}
            record={record}
          />
        })}
      </div>
    </DragAndDropContext.Provider>
  );
};

export default DragAndDropWidget;