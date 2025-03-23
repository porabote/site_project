import React, {useEffect, useContext, useRef, useState} from 'react';
import {Cell, Row} from "@porabote/ui/Table";
import {FilesContext} from "../Files";
import Icon, {CloseIcon, MinusIcon} from "@porabote/ui/Icons";

const PreviewPanelFileRow = (props) => {

  const {upload, fileInfo} = useContext(FilesContext);
  const {file} = props;

  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadingPercent, setUploadingPercent] = useState(0);

  const isIssetExtraFields = false;
  const extraFields = 1;
  let uploadProgress = 0;
  let uploadProgressElement = useRef();

  useEffect(() => {console.log(props.isUploading);
    if (props.isUploading) {
      upload(file, fileInfo, onUploadProgressHandler);
    }
  }, []);

  const onUploadProgressHandler = (progressEvent) => {
    setUploadingPercent(Math.round( (progressEvent.loaded * 100) / progressEvent.total ));
  }

  return (
    <Row gridTemplateColumns="minmax(200px, 1fr) 200px 200px 1fr 50px">
      <Cell>{file.basename} {file.uri}</Cell>
      <Cell>{`${Math.round(file.size / 1024)}`} KB</Cell>
      <Cell>{file.mime}</Cell>
      {isIssetExtraFields && <Cell>{extraFields}</Cell>}
      {props.isUploading &&
        <Cell ref={uploadProgressElement}>{uploadingPercent} %</Cell>
      }
      <Cell className="preview-panel__cell-delete">
        <Icon size={10}>
          <CloseIcon/>
        </Icon>
      </Cell>
    </Row>
  );
};

export default PreviewPanelFileRow;