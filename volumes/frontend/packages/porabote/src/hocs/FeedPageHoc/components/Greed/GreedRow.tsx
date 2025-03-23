import React, {useEffect, useContext} from 'react';
import {Cell, Row} from "@porabote/ui/Table";
import ObjectMapperHelper from "@porabote/helpers/ObjectMapperHelper";
import {FeedPageHocContext} from "@porabote/hocs/FeedPageHoc";

const GreedRow = (props) => {

    let {fetchData} = useContext(FeedPageHocContext);

    return (
        <Row {...props}>
            {Object.keys(props.map).map((cellName, index) => {

                let conf = props.map[cellName];

                let value = "";
                if (typeof conf.render == "function") {
                    value = conf.render(props.record);
                } else {
                    const dataKey = conf.dataKey ||  conf.name;
                    value = ObjectMapperHelper.get(dataKey, props.record);
                }
                return (<Cell fetchData={fetchData} onClickByRow={props.onClickByRow} {...conf} key={cellName}>{value}</Cell>);

            })}
        </Row>
    );
};

export default GreedRow;