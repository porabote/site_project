import React, {useContext} from "react";
import {Table, Row, Cell} from "@porabote/ui/Table";
import {FilesContext} from "../Files";
import PreviewPanelFileRow from "./PreviewPanelFileRow";

const PreviewPanel = (props) => {

  const {files, selectedFiles} = useContext(FilesContext);

  let isIssetExtraFields = (typeof props.setFileInfoFields == "function") ? true : false;

  return (
    <div className="preview-panel">

      {!selectedFiles.length ? null :

          <Table border={true} gridTemplateColumns="minmax(200px, 1fr) 200px 200px 1fr 50px">
            <Row className="head">
              <Cell>Название</Cell>
              <Cell>Размер</Cell>
              <Cell>Тип</Cell>
              {isIssetExtraFields && <Cell>Данные</Cell>}
              <Cell></Cell>
            </Row>
            {selectedFiles.map((file, index) => {
              let extraFields = (isIssetExtraFields) ? props.setFileInfoFields(file, index) : '';
              return <PreviewPanelFileRow isUploading={true} key={file.name + file.size + Math.random()} file={file} {...props}/>;
            })}
          </Table>

      }

    </div>
  );
}

export default PreviewPanel;

// const getPreviewImg = (file, index) => {
//
//   let href = URL.createObjectURL(file)
//   let typeSplits = file.type.split('/');
//
//   if (typeSplits[0] == 'image') {
//     return (
//       <div key={index} className="preview-panel-file-cover" style={{
//         backgroundImage: `url(${href})`,
//       }}></div>
//     )
//   } else {
//
//     if (typeof allowedExtensions[file.type] == "undefined") {
//       alert('Один из выбранных файлов имеет недопустимое разрешение.');
//       return;
//     }
//
//     return (
//       <div key={index} className="preview-panel-file-cover">
//         .{allowedExtensions[file.type]}
//       </div>
//     )
//   }
// }