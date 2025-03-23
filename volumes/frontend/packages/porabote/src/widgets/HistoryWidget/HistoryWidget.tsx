import React from 'react';
import moment from "moment";
import {HistoryWidjetType} from "./types/HistoryWidgetTypes";

const HistoryWidget = (props: HistoryWidjetType) => {

    let {data} = props;

    if (!Array.isArray(data)) {
        data = [];
    }

    return (
        <div className="prb-history-widget">

            <div className="prb-history-widget_title">История</div>

            {data.map((record, index) => {
                return(
                    <div className="prb-history-widget_record" key={index}>
                        <div className="prb-history-widget_user-name">
                            {record.user?.sur_name} {record.user?.first_name}
                        </div>
                        <div className="prb-history-widget_time">
                            {moment(record.created_at).format('DD/MM/YYYY HH:mm')}
                        </div>

                        {record.log}

                    </div>
                );
            })}
        </div>
    );
};

export default HistoryWidget;