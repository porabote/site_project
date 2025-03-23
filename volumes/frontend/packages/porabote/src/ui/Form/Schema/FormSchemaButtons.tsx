import React, {useContext} from 'react';
import FormContext from "../FormContext";

const FormSchemaButtons = () => {

  const {schema} = useContext(FormContext);

  const render = () => {

    let buttons = [];
    schema.getButtons().forEach((button) => {
      buttons.push(button);
    });
    return buttons;
  }

  return (
    <>
      {render()}
    </>
  );
};

export default FormSchemaButtons;