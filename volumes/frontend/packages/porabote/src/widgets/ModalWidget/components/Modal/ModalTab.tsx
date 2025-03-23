import React, {useContext} from 'react'
import ModalContext from "../../ModalContext";

export type modalTabProps = {
  itemkey: number;
  activeItemKey: number;
  title: string;
};

const ModalTab = (props: modalTabProps) => {

  const {activeTabKey, closeModal, setActiveTab} = useContext(ModalContext);

  return (
    <div className={activeTabKey == props.itemkey ? "modal-tabs-item active" : "modal-tabs-item"}>
          <span
            className="modal-tabs-item__link"
            onClick={() => setActiveTab(props.itemkey)}
          >
            {props.title}
          </span>
      <span
        className="modal-tabs-item__close modal-close"
        item-key={props.itemkey}
        onClick={() => {
          closeModal(props.itemkey)
        }}
      >
        </span>
    </div>
  );
}

export default ModalTab;
