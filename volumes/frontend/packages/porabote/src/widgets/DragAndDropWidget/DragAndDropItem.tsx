import React, {useContext} from 'react';
import DragAndDropWidget from "./index";
import DragAndDropContext from "./DragAndDropContext";

const DragAndDropItem = (props) => {

  const {dicts, onDragEnd, renderItemTitle, handleSort, dragItemRef, dragOverItemRef} = useContext(DragAndDropContext);
  const {record} = props;

  const renderChild = () => {
    if (record && record.children.length) {

      return <DragAndDropWidget
        records={record.children}
        renderItemTitle={renderItemTitle}
        onDragEnd={onDragEnd}
        dicts={dicts}
       />
    }

    return [];
  }

  return (
    <div
      lft={record.lft}
      index={props.index}
      key={props.index}
      className="drag-and-drop-item"
      draggable="true"
      onDragStart={(e) => dragItemRef.current = props.index}
      onDragEnter={(e) => dragOverItemRef.current = props.index}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnd={(e) => handleSort(e)}
    >
      {renderItemTitle(props.record)}
      <div>
        {renderChild()}
      </div>

    </div>
  );
};

export default DragAndDropItem;