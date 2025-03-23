import React, {useEffect, useContext} from 'react';
import "./ModalPage.less";
import ModalContext from "../../ModalContext";
import Icon, {CloseIcon, CloseTightIcon} from "@porabote/ui/Icons";

const ModalPage = (props) => {

    const {isPageOpen, pageContent, modal} = useContext(ModalContext);

    useEffect(() => {
        if (isPageOpen) {
            document.body.style.overflow = "hidden";
            // $('body').bind('touchmove', function(e){e.preventDefault()})
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isPageOpen]);

    return (
        <div
            className={`prb-modal-page-wrap ${isPageOpen ? 'active' : ''}`}
            onClick={(e) => {
                if (e.target.classList.contains("prb-modal-page-wrap")) {
                    modal.close(0, {mode: 'page'});
                }
            }}
        >
            <div className="prb-modal-page">

                    <Icon size="22px" fill="#999" fillHover="#333"
                          className="modal-page-close-block " onClick={() => modal.close(0, {mode: 'page'})}
                    >
                        <CloseTightIcon/>
                    </Icon>

                {pageContent}
            </div>
        </div>
    );
};

export default ModalPage;