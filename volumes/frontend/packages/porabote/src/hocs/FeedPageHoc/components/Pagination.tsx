import React, {useContext} from 'react';
import {toPriceFormat} from "@porabote/helpers/FormatHelper";
import {FormContext} from "@porabote/ui/Form";

const Pagination = () => {

  const {getValue} = useContext(FormContext);
  const meta = getValue('meta');

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