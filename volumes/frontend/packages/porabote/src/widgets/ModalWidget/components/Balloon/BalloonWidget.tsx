import React, {useContext, useEffect} from 'react';
import './assets/balloon.less'
import {BalloonPropsType} from "./types";
import BalloonMassage from "./BalloonMessage";
import ModalContext from "../../ModalContext";

const BalloonWidget = (props: BalloonPropsType) => {

  let {balloons} = useContext(ModalContext);

  return (
    <div className="porabote-balloon">
      {balloons.map((msg, index) => {
        return <BalloonMassage title={msg.title} key={msg.unique} unique={msg.unique} type={msg.type}/>;
      })}
    </div>
  );
};

export default BalloonWidget;