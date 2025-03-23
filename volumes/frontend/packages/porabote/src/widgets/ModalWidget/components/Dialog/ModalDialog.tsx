import React, {useContext, useEffect} from 'react';
import ModalContext from "../../ModalContext";
import "./ModalDialog.less";

const ModalDialog = () => {

  const {dialogContent, dialogButtons, isDialogOpen, closeDialog, isMinMode} = useContext(ModalContext);

  const closeWrapHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target.className === 'porabote-modal-dialog-wrap active') {
      closeDialog();
    }
  }

  return (
    <div onClick={closeWrapHandler} className={`porabote-modal-dialog-wrap ${isDialogOpen ? 'active' : ''}`}>
      <div className={`porabote-modal-dialog ${isDialogOpen ? 'active' : ''}`}>
        {isMinMode &&
          <>
            {dialogContent}
          </>
        }
        {!isMinMode &&
          <>
            <div className="porabote-modal-dialog-title">
              {dialogContent}
            </div>
            <div className="porabote-modal-dialog-buttons-panel">
              {dialogButtons.map((button, index) => React.cloneElement(
                button,
                {
                  key: index,
                  onClick: (e) => {
                    button.props.onClick(e, {...button.props, closeDialog});
                  },
                }
              ))}
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default ModalDialog;