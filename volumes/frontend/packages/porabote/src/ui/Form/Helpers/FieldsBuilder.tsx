import React from 'react';

interface IFieldsBuilder {
  fields: [
    [
      {
        [key: number]: {
          name: string,
          type: string,
          label?: string,
          width?: string,
        },
      },
    ],
  ],
};

const FieldsBuilder = (props: IFieldsBuilder) => {

  console.log(props);

  return (
    <div>
      123
    </div>
  );
};

export default FieldsBuilder;
