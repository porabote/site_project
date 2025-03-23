import React, {Children, useContext, useState, useEffect} from 'react';
import {Cell, Row, Table} from "@porabote/ui/Table";
import {SettingsContext} from "@porabote";
import GreedRow from "./GreedRow";
import ObjectMapper from "@porabote/helpers/ObjectMapperHelper";
import {FeedHocContext} from "@porabote/hocs/FeedHoc";
import {greedPropsType} from "./GreedTypes";

const Greed = (props: greedPropsType) => {

  const [cellsMap, setCellsMap] = useState(null);
  const [gridTemplateColumns, setGridTemplateColumns] = useState(null);
  const [headRow, setHeadRow] = useState(null);

  const {lang} = useContext(SettingsContext);
  let {records, fetchData} = useContext(FeedHocContext);

  // if (props.records) {
  //   records = props.records;
  // }

  if (!records.length) {
    <div>Нет данных</div>
  }

  useEffect(() => {
    buiildCellsMap();
  }, []);

  const buiildCellsMap = () => {

    let map = new Map();

    Children.map(props.children, (child: React.ReactNode) => {

      let orderKey = getKeyOrder(1, map);

      if (!child.props.name) return;

      if (typeof child.props.orderKey != "undefined") {
        map.set(child.props.orderKey, {...child.props, name: child.props.name});
      } else {
        map.set(orderKey, {...child.props, name: child.props.name});
      }

    });

    if (props.map) {
      for (let fieldName in props.map) {
        if (typeof props.map[fieldName].orderKey != "undefined") {
          map.set(props.map[fieldName].orderKey, {...props.map[fieldName], name: fieldName});
        } else {
          let orderKey = getKeyOrder(1, map);
          props.map[fieldName].orderKey = orderKey;
          map.set(orderKey, {...props.map[fieldName], name: fieldName});
        }
      }
    }

    let mapSorted = Array.from(map.keys()).sort().reduce(
      (obj, key) => {
        obj[key] = map.get(key);
        return obj;
      },
      {}
    );

    setCellsMap(mapSorted);

    buildHeadRow(mapSorted)
  }


  const getKeyOrder: (key: number, map: Map<number, any>) => number = (key, map) => {
    if (map.has(key)) {
      return getKeyOrder(key + 1, map);
    }
    return key;
  }

  const buildHeadRow = (cellsMap: { [key: string]: any }) => {

    let sizes: string[] = [];

    let row =
      <Row class="head no-hover">
        {Object.keys(cellsMap).map((colName) => {

          let colSize: string = "100px";

          let conf = cellsMap[colName];
          if (conf.width) {
            colSize = conf.width;
          }
          sizes.push(colSize);

          return (
            <Cell key={colName}>
              {conf.label && conf.label[lang]}
            </Cell>
          );
        })}
      </Row>;
    if (gridTemplateColumns === null) {
      setGridTemplateColumns(sizes.join(" "));
    }
    setHeadRow(row);
  }

  if (!cellsMap || !headRow) {
    return <div>Построение списка</div>
  }

  return (
    <Table class="feed striped" gridTemplateColumns={gridTemplateColumns}>
      {headRow}
      {records.map((record: any, index: number) => {

        return React.createElement(GreedRow, {
          ...props,
          onClickByRow: props.onClickByRow,
          key: record.id,
          columns: props.children,
          record: record,
          map: cellsMap,
          fetchData,
        });
      })}
    </Table>
  );
};

export default Greed;