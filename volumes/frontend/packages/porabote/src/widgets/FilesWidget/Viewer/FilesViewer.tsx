import React, {useContext} from 'react';
import {FilesContext} from "../Files";
import FilesViewerFile from "../Viewer/FilesViewerFile";

const FilesViewer = (props: {files: any[]}) => {

  const {records} = useContext(FilesContext);
console.log(records);
  return (
    <div className="file-viewer">
      {records.map((file) => {
        return <FilesViewerFile files={records}  key={file.id} file={file}/>
      })}
    </div>
  );
};

export default FilesViewer;