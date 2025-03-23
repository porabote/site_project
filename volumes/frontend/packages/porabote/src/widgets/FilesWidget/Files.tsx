import React, {ReactNode, createContext, useState} from "react";
import {FileRecordType, IFile} from "./types/FilesWidgetTypes";
import {Api} from "@porabote";
import {ResponseType} from "@porabote/api";

type FilesProps = {
  children: ReactNode;
  uploadUrl: string;
  files: Function;
  fileRecordData: FileRecordType;
  records: FileRecordType[];
  updateRecords: Function;
  uploadCallback: Function;
};

export const FilesContext = createContext({
  uploadUrl: '',
  records: [],
  updateRecords: Function,
  onSelect: Function,
});

const FilesContainer = (props: FilesProps) => {

  const [uploadUrl] = useState(props.uploadUrl || '/files/upload')
  const [fileRecordData] = useState<FileRecordType>(props.fileRecordData || {});
  const [updateRecords] = useState(props.updateRecords);
  const [selectedFiles, setSelectedFiles] = useState([])

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    let {files} = e.target;
    setSelectedFiles([...files]);
    upload(files, fileRecordData);
  }

  const upload = async (files: FilesList) => {

    let formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append(`files[${i}]`, files[i]);
    }

    for (let fieldName in fileRecordData) {
      formData.append(fieldName, fileRecordData[fieldName]);
    }

    Api(uploadUrl).setData(formData)
      .onSuccess((response: ResponseType) => {
        props.uploadCallback(response.data);
      })
      .post();
  }

  return <FilesContext.Provider value={{
    uploadUrl,
    records: props.records || [],
    updateRecords: props.updateRecords,
    onSelect,
    selectedFiles,
    upload,
    fileRecordData,
  }}>{props.children}</FilesContext.Provider>;
}

export default FilesContainer;