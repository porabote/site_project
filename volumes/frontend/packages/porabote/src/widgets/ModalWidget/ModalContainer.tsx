import React, {useState} from 'react';
import {BalloonMessageType, ModalContentType, openConfigsMode} from "./ModalTypes";
import ModalContext from "./ModalContext";

const ModalContainer = (props: {children: React.ReactNode}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [tabs, setTabs] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState(0);
    const [isMinMode] = useState(false);
    const [isPageMode] = useState(false);

    const [balloons, setBalloons] = useState([]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogButtons, setDialogButtons] = useState([]);
    const [dialogContent, setDialogContent] = useState<ModalContentType>(<></>);

    const [isPageOpen, setIsPageOpen] = useState(false);
    const [pageContent, setPageContent] = useState<ModalContentType>(<></>);

    const openHandler = (element: ModalContentType, configs: openConfigsMode = {mode: "modal", buttons: []}) => {
        configs = Object.assign({
            mode: 'modal'
        }, {...configs});

        if (configs.mode == 'modal') {
            openModal(element);
        } else if (configs.mode == 'page') {
            openPage(element);
        } else if (configs.mode == 'dialog') {
            openDialog(element, configs.buttons);
        }
    }

    const closeHandler = (modalKey: number, configs: openConfigsMode = {mode: 'modal'}) => {
        configs = Object.assign({
            mode: 'modal'
        }, {...configs});

        if (configs.mode == 'modal') {
            closeModal();
        } else if (configs.mode == 'page') {
            closePage();
        }
    }


    const openPage = (element: ModalContentType) => {
        setPageContent(element);
        setIsPageOpen(true);
    }

    const closePage = () => {
        setPageContent(null);
        setIsPageOpen(false);
    }


    const closeModal = () => {
        setTabs([]);
        setIsOpen(false);
    }


    const openModal = (content: ModalContentType) => {

        setTabs([
            ...tabs,
            content,
        ]);

        setActiveTabKey(tabs.length);
        setIsOpen(true);
    }

    const setActiveTabKeyHandler = (keyId: number) => {
        setActiveTabKey(keyId);
    }


    const openDialog = (content: ModalContentType, buttons: any[], configs: any[]) => {
        setDialogContent(content);
        setDialogButtons(buttons || []);
        setIsDialogOpen(true);
        document.documentElement.classList.add("no-scroll");
    }

    const closeDialog = () => {
        setDialogContent(null);
        setDialogButtons([]);
        setIsDialogOpen(false);
        document.documentElement.classList.remove("no-scroll");
    }

    const pushBalloon = (title: string, type = 'notice') => {
        setBalloons([
            ...balloons,
            {title, type, unique: Math.floor(Math.random() * 1000000)},
        ])
    }

    const closeBalloon = (key: number) => {

        let msgsNew = balloons.filter((item: BalloonMessageType) => {
            return item.unique !== key;
        });

        setBalloons([...msgsNew]);
    }

    return (
        <ModalContext.Provider value={{
            modal: {
                open: openHandler,
                close: closeHandler,
            },
            isOpen,
            activeTabKey,
            tabs,
            setActiveTab: setActiveTabKeyHandler,
            closeModal,
            openModal,
            isDialogOpen,
            isPageMode,
            openDialog,
            closeDialog,
            dialogContent,
            dialogButtons,
            isMinMode,
            balloons,
            pushBalloon,
            closeBalloon,
            isPageOpen,
            pageContent,
        }}>
            {props.children}
        </ModalContext.Provider>
    );

}

export default ModalContainer;