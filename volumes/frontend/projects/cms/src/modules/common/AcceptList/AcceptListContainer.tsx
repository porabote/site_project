import React from 'react';
import AcceptListBuilding from "@/modules/common/AcceptList/AcceptListBuilding";
import AcceptListSignProcess from "@/modules/common/AcceptList/AcceptListSignProcess";
import {AcceptListType} from "@/modules/common/AcceptList/types";

const AcceptListContainer = (props: AcceptListType) => {

  const {isReady} = props;

  if (!isReady) {
    return (
      <div>
        <AcceptListBuilding {...props}/>
      </div>
    );
  }

  return (
    <div>
      <AcceptListSignProcess {...props}/>
    </div>
  );

};

export default AcceptListContainer;