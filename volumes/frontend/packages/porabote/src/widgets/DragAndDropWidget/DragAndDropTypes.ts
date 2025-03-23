export type DragAndDropContextType = {
  records: any[];
  dragItemRef: Function;
  dragOverItemRef: HTMLFormElement;
  handleSort: Function;
  onDragEnd: Function;
  dicts: {[key: string]: any};
  renderItemTitle: Function;
};