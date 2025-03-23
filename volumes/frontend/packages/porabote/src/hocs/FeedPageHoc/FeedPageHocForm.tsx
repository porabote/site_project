import React from 'react';
import ObjectMapper from "@porabote/helpers/ObjectMapperHelper";
import {Form, FormSchema} from "@porabote/ui/Form";
import FeedPageHoc from "./FeedPageHoc";
import {FeedPagePropsType} from "./types/FeedPageHocTypes";

const FeedPageHocForm = (props: FeedPagePropsType) => {

  const filterInit = ObjectMapper.mergeDeep(
      {
        where: {},
        whereBetween: {},
        orWhereGrouped: [],
        whereIn: {},
        orWhere: {},
        custom: {}
      },
      props.filterInit || {}
    );

  const metaDefault = {
    count: 0, // total count of records
    limit: 50,
    perPage: 0, // total count of loaded records
    lastId: 0,
  };

  const formSchema = new FormSchema();
  formSchema.setInitialValues({filter: {...filterInit}, meta: {...metaDefault}});

  return (
    <Form schema={formSchema}>
      <FeedPageHoc {...props}/>
    </Form>
  );
};

export default FeedPageHocForm;