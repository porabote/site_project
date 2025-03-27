import {useContext} from "react";
import {AuthContext} from "@packages/porabote";
import {LoginFormData} from "./Types";
import {ApiGetType, ResponseType, ResponseTypeError} from "@porabote/api/ApiTypes";
import {Api} from "@packages/porabote";
import JwtHandler from "@porabote/helpers/JwtHelper";
import config from "../../../config";

const setRefreshToken = (refreshToken: string) => {

    const port = process.env.NODE_ENV == 'development' ? 8000 : 7001;//todo

    post('/auth/refreshToken/', {refreshToken}, {
        url: `https://${process.env.HOST}:${port}`,
    });

}

const getRefreshToken = () => {

    const port = process.env.NODE_ENV == 'development' ? 8000 : 7000;//todo
    Api('/auth/refreshToken/')
        .setUrl(`https://${process.env.HOST}:${port}`)
        .setHeader('Access-Control-Allow-Credentials', 'true')
        .setCredentials("include")
        .get();
}

const refreshToken = async (refresh_token: string) => {
    return await Api('/auth/refreshToken/').setData({
        refresh_token,
        access_token: getToken()
    }).post();
}


export const setTokenToLocalStorage = (value: string) => {
    localStorage.setItem(config.access_token_name, value);
}
export const removeTokenToLocalStorage = () => {
    localStorage.removeItem(config.access_token_name);
}

const logout = () => {
    return post("/auth/logout")
}

const post = async (
    uri: string,
    data?: { [key: string]: any } | FormData,
    params: ApiGetType = {url: 'api', headers: {}}) => {

    const url = (typeof params.url !== "undefined") ? params.url : 'api';

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Access-Control-Allow-Credentials', 'true');
    requestHeaders.set('Accept', 'application/json');

    let body;
    // Excluding Content type for correctly binding of data
    if (data instanceof FormData) {
        body = data;
    } else {
        requestHeaders.set('Content-Type', 'application/json;charset=UTF-8');
        body = JSON.stringify(data);
    }

    const response = await fetch(`${url}${uri}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: requestHeaders,
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body,
    });

    const responseJSON = await response.json();
    return {...responseJSON, ...{response: {status: response.status}}};
}

export const getToken = () => {
    let accessToken = localStorage.getItem(config.access_token_name);
    if (typeof accessToken === "string" && accessToken.length > 0) {
        return accessToken;
    }
    return null;
};

export const getTokenData = () => {
    const token = getToken();
    if (token !== null) {
        return JwtHandler.parsePayload(getToken());
    }
    return null;
}