import React, {Children} from 'react';
import {Cell, Row} from "@porabote/ui/Table";

const GreedColumn = (props) => {

  {Children.map(props.children, (child, index) => {

    if (child.type.name == "GreedColumn") {
      console.log(props.columns, 33);
      return(
        <Row>
          {child.props.columns.map((cell) => {
console.log(cell, 77);
            return(
              <Cell>
                123
              </Cell>
            );
          })}
        </Row>
      );
    }
  })}

  return (
    <Row>
      <Cell {...props}>
        123
      </Cell>
    </Row>
  );
};

export default GreedColumn;