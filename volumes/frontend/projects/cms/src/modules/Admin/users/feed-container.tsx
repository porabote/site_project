import React, {useEffect} from 'react';
import DataSourceWrapper from "@/app/data-source/data-source-wrapper";
import Feed from "./templates/feed";
import Api from "@/services/api-service";

const FeedContainer = () => {

  // const fetchDicts = async () => {
  //   const dicts = await Api.get("/users/get/");
  //   return dicts.data;
  // };

  const configs = {
    greedMap: {
      id: {
        width: '100px',
        label: {ru: 'ID', en: 'ID'},
      },
      created_at: {
        width: '160px',
        label: {ru: 'Время добавления', en: 'Created at'},
      },
    },
  }

  return(
    <DataSourceWrapper
      relations={[
        // 'guest.card',
        // 'club',
      ]}
      greedMap={configs.greedMap}
      isFiltersOpen={false}
      modelName="users">
      <Feed/>
    </DataSourceWrapper>
  );
};

export default FeedContainer;