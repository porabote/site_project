import React, {useRef, useEffect, useState, MouseEventHandler} from "react";

type propsTypes = {
  children?: React.ReactNode;
  class?: string;
  style?: { [key: string]: React.CSSProperties };
  float?: boolean;
  onClick?: (e: MouseEventHandler<HTMLDivElement>) => {};
}
const Cell = (props: propsTypes) => {

  const cellRef = useRef(null);

  const [style, setStyle] = useState(props.style || {});
  const [floatStyle, setFloatStyle] = useState({});
  const [isRendered, setIsRendered] = useState(false);
  const [className, setClassName] = useState(`prb-table__cell ${props.class || ''}`);

  useEffect(() => {
    setFloatParams();
  }, [isRendered]);

  const setFloatParams = () => {
    if (props.float) {

      if (cellRef && cellRef.current) {

        const rect = cellRef.current.getBoundingClientRect();

        let leftPos = `${rect.left - props.rowRef.current.getBoundingClientRect().left - 1}px`;

        const floatStyle = {
          left: leftPos,
          position: 'sticky',
          maxWidth: '300',
        };

        setFloatStyle({...floatStyle});
        setIsRendered(true);
      }
    }
  }

  const onClickHandler = (e) => {
    if (typeof props.onClick == "function") {
      props.onClick(e, {...props});
      return;
    }

    if (typeof props.onClickByRow == "function") {
      props.onClickByRow(e, {...props});
    }
  }

  if (props.float) {
    return (
      <div onClick={onClickHandler} className={className} ref={cellRef} style={{...style, ...floatStyle}}>
        <span>{props.children}</span>
      </div>
    );
  }

  return (
    <div onClick={onClickHandler} style={{...props.style}} className={`prb-table__cell ${props.class || ''}`}>
      {props.children}
    </div>
  );
}
export default Cell;