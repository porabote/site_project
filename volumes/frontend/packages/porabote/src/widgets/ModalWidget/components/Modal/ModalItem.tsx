import React, {useContext} from "react";
import {modalItemProps} from "../../ModalTypes";
import ModalContext from "../../ModalContext";

const ModalItem = (props: modalItemProps) => {

  const {activeTabKey} = useContext(ModalContext);

  return (
    <div className={activeTabKey == props.itemkey ? "modal-tabs-block active" : "modal-tabs-block"}>
      <div className="modal-box">

        <div className="modal-box-center">
          {React.cloneElement(props.content, {
            itemkey: props.itemkey,
          })}
        </div>

      </div>
    </div>
  );

}

export default ModalItem;
