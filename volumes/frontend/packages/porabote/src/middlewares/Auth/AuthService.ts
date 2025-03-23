import {LoginFormData} from "./Types";
import {ApiGetType, ResponseType, ResponseTypeError} from "@porabote/api/ApiTypes";
import {API_URL, APP_DOMAIN_BASE, AUTH_URL, ACCESS_TOKEN_NAME} from "@packages/porabote/src/api/ApiConfigs";
import {Api} from "@packages/porabote";
import JwtHandler from "@porabote/helpers/JwtHelper";

export const loginHandler = (values: LoginFormData, callbackSuccess?: Function, callbackError?: Function) => {

    Api('/login')
        .setUrl(AUTH_URL)
        .onSuccess((response: ResponseType) => {

            const {accessToken, refreshToken} = response.data;

            if (!accessToken) {
                return callbackError({error: 'Access token not received'});
            }

            localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);

          //  setRefreshToken(refreshToken);

            callbackSuccess();

        })
        .onApiError((error: ResponseTypeError) => {console.log(error);
            callbackError(error);
        })
        .setData({...values}).post();
}


export const signUpHandler = (values: any, successCallback: Function) => {
    Api('/registration').setUrl(AUTH_URL)
        .onSuccess((response: ResponseType) => {
            successCallback(response);
        })
        .setData({...values})
        .post();
}

const setRefreshToken = (refreshToken: string) => {

    const port = process.env.NODE_ENV == 'development' ? 8000 : 7001;//todo

    post('/auth/refreshToken/', {refreshToken}, {
        url: `https://${APP_DOMAIN_BASE}:${port}`,
    });

}

const getRefreshToken = () => {

    const port = process.env.NODE_ENV == 'development' ? 8000 : 7000;//todo
    Api('/auth/refreshToken/')
        .setUrl(`https://${APP_DOMAIN_BASE}:${port}`)
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
    localStorage.setItem(ACCESS_TOKEN_NAME, value);
}
export const removeTokenToLocalStorage = () => {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
}

const logout = () => {
    return post("/auth/logout")
}

const post = async (
    uri: string,
    data?: { [key: string]: any } | FormData,
    params: ApiGetType = {url: API_URL, headers: {}}) => {

    const url = (typeof params.url !== "undefined") ? params.url : API_URL;

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
    let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
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

