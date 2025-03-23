import React, {useState, useRef} from "react";
import Cell from "./Cell";
import {useNavigate} from "react-router-dom";
import {RowPropsTypes} from "./TableTypes";

const Row = (props: RowPropsTypes) => {

  const rowRef = useRef(null);

  const initClass = () => {
    let classList = "";
    classList = typeof props.class == "undefined" ? "prb-row" : `prb-row ${props.class}`

    if (props.index === 0) {
      classList += " head";
      if (props.isHeadFloat) {
        classList += " float";
      }
    }

    return classList;
  }

  const [style] = useState(props.style || {});
  const [classList] = useState(initClass());

  const navigate = useNavigate();

  const onClickHandle = (e) => {console.log(props);
    if (typeof props.onClickHandler == "function") {
      props.onClickHandler(props);
    }

    if (props.linkTo) {
      let link = setLink(props.linkTo, props.record);
      navigate(link);
    }
  }

  const setLink = (link: string, data: {[key: string]: any}) => {
    let matches = link.match(/(:[A-Za-z0-9\-\_]+)/g);

    if(matches.length) {
      matches.forEach((propName) => {
        link = link.replace(propName, data[propName.replace(':', '')]);
      })
    }

    return link;
  }

  return (
      <div ref={rowRef} className={classList} style={{gridTemplateColumns: props.gridTemplateColumns, ...style}}>
        {React.Children.map(props.children, (cell, index) => {
          if (!cell) return;
          return <Cell onClickByRow={props.onClickByRow} rowRef={rowRef} onCLickHandle={onClickHandle} {...cell.props} record={props.record} />;
        })}
      </div>
  );
}

export default Row;