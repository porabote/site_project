import React, {useContext} from 'react';
import {FeedHocContext} from "@porabote/hocs/FeedHoc";
import {toPriceFormat} from "@porabote/helpers/FormatHelper";

const Pagination = (props) => {

  const {meta} = useContext(FeedHocContext);

  if (!meta) {
    return <div></div>;
  }

  let showedCount = (typeof meta.offset != "undefined") ? meta.offset + meta.perPage : 'загрузка';


  return (
    <div>
      <div className="lazy-load__info">
        <span
          key="showed">Показано <span className="button_lazy-load__digital"> {showedCount} </span> из <span key="count" className="button_lazy-load__digital"> {toPriceFormat(meta.count)} </span>
        </span>
      </div>
    </div>
  );

}

export default Pagination;