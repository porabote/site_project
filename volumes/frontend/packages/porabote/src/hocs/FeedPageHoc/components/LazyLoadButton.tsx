import React, {useContext} from 'react';
import {FeedPageHocContext} from "@porabote/hocs/FeedPageHoc";
import {toPriceFormat} from "@porabote/helpers/FormatHelper";
import {FormContext} from "@porabote/ui/Form";

const LazyLoadButton = () => {

  const {fetchData} = useContext(FeedPageHocContext);
  const {getValue} = useContext(FormContext);

  const meta = getValue('meta');

  if (!meta) {
    return <div></div>;
  }

  let isActive = (meta.offset + meta.perPage >= meta.count) ? false : true

  let showedCount = (typeof meta.offset !== "undefined") ? meta.offset + meta.perPage : 'загрузка';

  return (
    <div>
      <div
        className={isActive ? "button_lazy-load" : "button_lazy-load non-active"}
        onClick={() => {
          if (isActive) {
            fetchData();
          }
        }}>
        <span key="showed" className="">Показано
            <span
              className="button_lazy-load__digital"
            > {showedCount} </span> из <span key="count"
                                             className="button_lazy-load__digital"> {toPriceFormat(meta.count)} </span>
        </span> показать еще ...
      </div>
    </div>
  );

}

export default LazyLoadButton;