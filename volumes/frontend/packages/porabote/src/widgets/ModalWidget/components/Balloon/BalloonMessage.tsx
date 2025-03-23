import React, {useContext, useEffect} from 'react';
import {BalloonMessageType} from "../../ModalTypes";
import Icon, {CloseIcon} from "@packages/porabote/src/ui/Icons";
import ModuleContext from "../../ModalContext";

const BalloonMessage = (props: BalloonMessageType) => {

  const {closeBalloon} = useContext(ModuleContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      closeBalloon(props.unique);
    }, 3000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  const closeMsgHandler = () => {
    closeBalloon(props.unique);
  }

  return (
    <div className="porabote-balloon_msg">
      <div className="porabote-balloon_msg__title">
        {props.title}
      </div>
      <div className="porabote-balloon_msg__close" onClick={closeMsgHandler}>
        <Icon size={15} fill="rgba(85, 85, 98, 0.4)" fillHover="#333">
          <CloseIcon/>
        </Icon>
      </div>
    </div>
  );
}

export default BalloonMessage;