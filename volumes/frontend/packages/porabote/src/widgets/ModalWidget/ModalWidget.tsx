import * as React from 'react';
import ModalTab from './components/Modal/ModalTab';
import ModalItem from './components/Modal/ModalItem';
import {useContext} from "react";
import ModalContext from "./ModalContext";
import BalloonWidget from "./components/Balloon/BalloonWidget";
import './assets/Modal.less';
import ModalPage from "./components/ModalPage/ModalPage";
import ModalDialog from "./components/Dialog/ModalDialog";

const ModalWidget = () => {

  const {
    isOpen,
    tabs,
    closeModal, openModal,
    activeTabKey,
    balloons,
  } = useContext(ModalContext);

  return (
    <>
      <div
        className={isOpen ? "modal active" : "modal"}
        onClick={() => {
          closeModal();
        }}
      >
        <div
          className={isOpen ? "modal-box-wrap active" : "modal-box-wrap"}
          onClick={e => {
            e.stopPropagation()
          }}
        >
          <div id="modal-tabs">
            {tabs.map((tab, index) => {

              let title = tab.props.title ? tab.props.title : "";

              return <ModalTab
                title={title}
                activeItemKey={activeTabKey}
                itemkey={index}
                key={index}
              />
            })}
          </div>

          {tabs.map((tab, index) => {

            return <ModalItem
              activeItemKey={activeTabKey}
              content={tab}
              itemkey={index}
              key={index}
            />
          })}

        </div>
      </div>

      <BalloonWidget/>

      <ModalPage/>
      <ModalDialog/>
    </>
  );

}

export default ModalWidget;
