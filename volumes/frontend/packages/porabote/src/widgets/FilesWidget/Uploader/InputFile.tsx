import React, {useContext} from "react";
import {FilesContext} from "../Files";

type InputFileDefaultType = {
  name: string;
  onSelect: Function;
}

const InputFile: React.FC = (props: InputFileDefaultType) => {

  const {onSelect} = useContext(FilesContext);

  return (
    <label htmlFor="upload" className="upload__label-default">
        <input
          name={props.name}
          className="upload__upload-input-default"
          type="file"
          id="upload"
          multiple={true}
          onChange={onSelect}
        />
      Загрузить файл
    </label>
  );
}

export default InputFile;