import React, {useContext} from 'react';
import Api from "@porabote/api";
import axios from 'axios';
import {getToken} from "@porabote/middlewares/Auth/AuthService";
import {API_CLIENT_ID, API_URL} from "@services/host/src/configs/Config";
import {FileRecordType} from "../types/FilesWidgetTypes";

const upload = (
  file: File,
  fileInfo: FileRecordType,
  onUploadProgressHandler: Function
): Promise<any> => {

  let formData = new FormData();
  formData.append("file", file);

  for (let fieldName in fileInfo) {
    formData.append(fieldName, fileInfo[fieldName]);
  }

  const requestHeaders = setHeaders({});

  var config = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "omit",
    headers: requestHeaders,
    redirect: "follow",
    referrerPolicy: "no-referrer",
    onUploadProgress: function (progressEvent) {
      onUploadProgressHandler(progressEvent);
    }
  };

  axios.post(`${API_URL}${uploadUrl}`, formData, config)
    .then(function (res) {
      console.log(res);
      // output.className = 'container';
      // output.innerHTML = res.data;
    })
    .catch(function (err) {
      // output.className = 'container text-danger';
      // output.innerHTML = err.message;
    });

}

const setHeaders = (customHeaders?: { [key: string]: string }) => {

  const requestHeaders = {
    common: {
      Authorization: `bearer ${getToken()}`,
      ClientId: `${API_CLIENT_ID}`,
      'Access-Control-Allow-Credentials': false,
      Accept: 'application/json, text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8',
      //   'Content-Type': `application/json, text/html;charset=UTF-8`,
    }
  };

  if (customHeaders) {
    for (const [headerName, headerValue] of Object.entries(customHeaders)) {
      //requestHeaders.set(headerName, headerValue);
    }
  }
  return requestHeaders;
}

const FileUploadService = {
  upload,
};

export default FileUploadService;