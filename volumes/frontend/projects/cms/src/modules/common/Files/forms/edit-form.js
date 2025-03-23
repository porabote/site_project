import React, { useState, useEffect } from "react";
import {
  Form,
  Field,
  InputHidden,
  Input,
  Button,
  SubmitButton,
  Textarea,
} from "porabote/form";
import File from "../models/file";

const EditForm = (props) => {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    getFile();
  }, []);

  const getFile = async function () {
    const record = await File.get(props.id);
    setRecord(record);
  };

  if (!record) return "<p>Загружаю данные</p>";

  return (
    <div>
      <Form
        values={record.attributes}
        submitForm={() => {
          record.update();
          props.callback();
        }}
      >
        <Field>
          <Textarea label="Комментарий" name="dscr" />
        </Field>

        <SubmitButton>
          <Button
            text="Сохранить"
            className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
            type="button"
            style={{ width: "140px", marginTop: "20px" }}
          />
        </SubmitButton>
      </Form>
    </div>
  );
};

export default EditForm;
