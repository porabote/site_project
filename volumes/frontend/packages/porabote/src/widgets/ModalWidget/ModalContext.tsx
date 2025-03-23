import React, {createContext} from 'react';
import {ModalContextType} from "@porabote/widgets/ModalWidget/ModalTypes";

const initialAuth: ModalContextType  = {
  modal: {
    open: () => {},
    close: () => {},
  },
  isOpen: false,
  isDialogOpen: false,
  activeTabKey: 0,
  tabs: [],
  closeModal: () => {
    console.log(close)
  },
  openModal: () => {
    console.log(open)
  },
  openDialog: (content: any, buttons?: any[], config?: [key: any]) => {
    console.log(open)
  },
  closeDialog: () => {
    console.log(close)
  },
  balloons: [],
  pushBalloon: Function,
  closeBalloon: Function,
  isPageOpen: false,
  isPageMode: false,
  setActiveTab: (keyId: number) => {}
};

export default createContext(initialAuth);