import React from 'react';
import { Form, Field, Select, Option, Input, Textarea, SubmitButton, Button, TexareaCKEditor } from '@/app/form';

const InsertImageForm = (props) => {

  return (
    <Form
      action="/api/contents/save/"
      values={{...props}}
      submitForm={(values) => props.insertImage(values.url, values.width, values.height, values.alt)}
    >
      <Field>
        <Input name="url" label="Адрес изображения" />
      </Field>

      <Field>
        <Input name="width" label="Ширина" />
      </Field>
      <Field>
        <Input name="height" label="Высота" />
      </Field>
      <Field>
        <Input name="alt" label="Alt описание" />
      </Field>

      <SubmitButton
        className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
        type="submit"
        text="Сохранить"
      />

    </Form>
  );
};

export default InsertImageForm;
