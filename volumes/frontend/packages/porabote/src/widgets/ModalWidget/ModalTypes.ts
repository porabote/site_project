import {Component, FC, ReactElement, ReactNode} from "react";

export type ModalContextType = {
  modal: {
    open: Function,
    close: Function,
  },
  isOpen: boolean,
  activeTabKey: number,
  tabs: any[],
  setActiveTab: (keyId: number) => void,
  closeModal: Function,
  openModal: Function,
  isDialogOpen: boolean,
  isPageMode: boolean,
  openDialog: Function,
  closeDialog: Function,
  dialogContent?: ModalContentType,
  dialogButtons?: any[],
  isMinMode?: boolean,
  balloons?: BalloonMessageType[],
  pushBalloon: Function,
  closeBalloon: Function,
  isPageOpen?: boolean,
  pageContent?: ModalContentType,
}

export type modalItemProps = {
  itemkey: number;
  activeItemKey: number;
  key: number,
  title?: string;
  content: ReactElement<any>;
};

export type modalStateProps = {
  items: modalItemProps[];
  isOpen: boolean;
  activeItemKey: number;
};

export type ModalContentType = (FC | Component | Element | ReactElement | ReactNode | null);

export type BalloonPropsType = {
  msgs?: BalloonMessageType[];
}

export type BalloonMessageType = {
  type: string;
  title: string;
  unique: number;
}

export type openConfigsMode = {
  mode: 'modal' | 'dialog' | 'page' | 'balloon';
};