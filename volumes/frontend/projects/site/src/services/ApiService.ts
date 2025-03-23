import {ApiGetType} from "@/services/types";
import {API_URL, API_VERSION, API_CLIENT_ID} from "@/configs/Config";
import LocalStorageService from "@/components/Common/LocalStorage";

const Api = () => {

  const get = async (uri: string, data?: { [key: string]: any }, params?: ApiGetType = {}) => {

    params = Object.assign(
      {url: API_URL, headers: {}},
      {...params},
    );

    let {url, headers} = params;

    let queryUri = uri;

    if (params.query) {
      const query = objectToQuerystring(params.query);
      queryUri = `${queryUri}?${query}`;
    }

    const requestHeaders = setHeaders(headers);

    const responseParams: RequestInit = {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: requestHeaders,
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };


    try {

      let response = await fetch(`${url}${queryUri}`, responseParams);

      if (!response.ok) {
// todo handle error
      } else {
        let json = await response.json();
        return {...json, ...{response: {status: response.status}}};
      }

    } catch (error) {
      if (error instanceof SyntaxError) {
        // Unexpected token < in JSON
        console.log('There was a SyntaxError', error); // TODO notify alert
      } else {
        console.log('There was an error', error); // TODO notify alert
      }
    }

//     try {
//       const responseJson = await response.json();
// console.log(responseJson);
//       // check for error response
//       if (!responseJson.ok) {
//         // get error message from body or default to response statusText
//         const error = (responseJson && responseJson.message) || responseJson.statusText;
//         alert(99);
//         return Promise.reject(error);
//       }
//
//       return {...response, ...{response: {status: response.status}}};
//     } catch (e) {
//       console.log(e);
//     }

  }

  const post = async (uri: string, data?: { [key: string]: any } | FormData, params: ApiGetType = {}) => {

    params = Object.assign(
      {url: API_URL, headers: {}},
      {...params},
    );

    let {url, headers} = params;

    const credentials = (params.credentials) ? params.credentials : 'omit';

    const requestHeaders = setHeaders(params.headers);

    let body;
    // Excluding Content type for correctly binding of data
    if (data instanceof FormData) {
      body = data;
    } else {
      requestHeaders.set('Content-Type', 'application/json;charset=UTF-8');
      body = JSON.stringify(data);
    }

    const responseParams: RequestInit = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials,
      headers: requestHeaders,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body,
    };

    try {

      let response = await fetch(`${url}${uri}`, responseParams);

      if (!response.ok) {
        // todo handle error
      } else {
        let json = await response.json();
        return {...json, ...{response: {status: response.status}}};
      }

    } catch (error) {
      if (error instanceof SyntaxError) {
        // Unexpected token < in JSON
        console.log('There was a SyntaxError', error); // TODO notify alert
      } else {
        console.log('There was an error', error); // TODO notify alert
      }
    }

    // console.log(response);
    //
    // const responseJSON = await response.json();
    // return {...responseJSON, ...{response: {status: response.status}}};
  }

  const setHeaders = (customHeaders?: { [key: string]: string }) => {
    const requestHeaders = new Headers();
    requestHeaders.set('Access-Control-Allow-Credentials', 'false');
    requestHeaders.set('Authorization', `bearer ${LocalStorageService.getAccessToken()}`);
    requestHeaders.set('Accept', 'application/json, text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8');
    requestHeaders.set('Content-Type', `application/json, text/html;charset=UTF-8`);
    requestHeaders.set('ClientId', `${API_CLIENT_ID}`);
    requestHeaders.set('Api-Version', `${API_VERSION}`);
    if (customHeaders) {
      for (const [headerName, headerValue] of Object.entries(customHeaders)) {
        requestHeaders.set(headerName, headerValue);
      }
    }
    return requestHeaders;
  }

  const objectToQuerystring = (obj: { [key: string]: any }, prefix: string | null = null) => {
    const str: any[] = [];
    Object.keys(obj).map((key: string) => {
      const k: string = prefix ? `${prefix}[${key}]` : key;
      const v: any = obj[key] ? obj[key] : "";

      let newItem = (v !== null && typeof v === "object")
        ? objectToQuerystring(v, k) : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
      str.push(newItem);
      return k;
    });

    return str.join("&");
  }

  const queryStringToObject = (uri: string) => {

    uri = uri.replace(/^\?*/, "");
    if (uri.length === 0) return {};

    let uriChains: string[] = uri.split("&");

    let source: { [key: string]: string } = {};
    uriChains.forEach((chain: string, index: number) => {
      const [name, value] = chain.split("=");
      source[name] = value;
    });

    return source;
  }

  return {get, post};

}

export default Api();
