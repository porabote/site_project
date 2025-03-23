import React, {useContext} from 'react';
import {ModalContext} from "@porabote";
import EditMetaDataDialog from "./modals/EditMetaDataDialog";
import {FILES_URL} from "@services/host/src/configs/Config";

const FilesViewerFile = (props) => {

  const {file, fetchData} = props;
  const {openModal} = useContext(ModalContext);

  const openEditMetaDataModal = () => {
    openModal(<EditMetaDataDialog fetchData={fetchData}  record={file} title="Редиктировать запись"/>);
  }

  return (
    <div
      onClick={openEditMetaDataModal}
      className="file-viewer-file"
      style={{backgroundImage: `url('${FILES_URL}${file.uri}')`}}>
      {file.alt ? file.alt : file.basename}
    </div>
  );
};

export default FilesViewerFile;