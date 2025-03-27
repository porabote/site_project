import {getToken} from "@porabote/middlewares/Auth/AuthService";
import {objectToQuerystring} from "./ApiHelper";

class Api {

    private host;
    private api_version = 1;
    private api_client_id = 1;
    private uri: string | null = null;
    private requestData: { [key: string]: any } = null;
    private readonly requestHeaders: { [key: string]: any };
    private credentials: 'omit' | 'same-origin' | 'include' = 'omit';
    private apiError: string | null = null;
    private response = {};
    private onSuccessHandler: Function = null;
    private onApiErrorHandler: Function = null;

    constructor(uri: string, config: {[key: string]: string}) {
        this.host = config.api_host;
        this.uri = uri;
        this.requestHeaders = this.setHeaders();
    }

    setCredentials = (value: 'omit' | 'same-origin' | 'include') => {
        this.credentials = value;
        return this;
    }

    setUrl = (url: string) => {
        this.host = url;
        return this;
    }

    setHeaders = (customHeaders?: { [key: string]: string }) => {
        const requestHeaders = new Headers();
        requestHeaders.set('Access-Control-Allow-Credentials', 'false');
        requestHeaders.set('Authorization', `bearer ${getToken()}`);
        requestHeaders.set('Accept', 'application/json, text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8');
        requestHeaders.set('ClientId', `${this.api_client_id}`);
        requestHeaders.set('Api-Version', `${this.api_version}`);
        requestHeaders.set('max-age', `3900`);

        if (!this.isFormData) {
            requestHeaders.set('Content-Type', `application/json, text/html;charset=UTF-8`);
        }

        if (customHeaders) {
            for (const [headerName, headerValue] of Object.entries(customHeaders)) {
                if (headerValue === null) return;
                requestHeaders.set(headerName, headerValue);
            }
        }
        return requestHeaders;
    }

    setHeader = (header: string, value: string) => {
        this.requestHeaders.set(header, value);
        return this;
    }

    public setData = (data: { [key: string]: any }) => {
        this.requestData = data;
        return this;
    }

    onSuccess = (func: Function) => {
        this.onSuccessHandler = func;
        return this;
    }

    onApiError = (func: Function) => {
        this.onApiErrorHandler = func;
        return this;
    }

    public get = async () => {

        if (this.requestData) {
            this.uri = `${this.uri}?${objectToQuerystring(this.requestData)}`;
        }

        const responseParams: RequestInit = {
            method: "GET",
            mode: "cors",
           // cache: "no-cache",
            credentials: this.credentials,
            headers: this.requestHeaders,
            redirect: "follow",
            referrerPolicy: "no-referrer",
        };


        try {
            await this.sendRequest(responseParams);
            return this;
        } catch (error) {
            if (error instanceof SyntaxError) {
                // Unexpected token < in JSON
                console.log('There was a SyntaxError', error); // TODO notify alert
            } else {
                console.log('There was an error', error); // TODO notify alert
            }
        }

    }

    public post = async () => {

        let body;
        // Excluding Content type for correctly binding of data
        if (this.requestData instanceof FormData) {
            body = this.requestData;
            this.requestHeaders.delete('Content-Type');
        } else {
            this.requestHeaders.set('Content-Type', 'application/json;charset=UTF-8');
            body = JSON.stringify(this.requestData);
        }

        const responseParams: RequestInit = {
            method: "POST",
            mode: "cors",
            //cache: "no-cache",
            credentials: this.credentials,
            headers: this.requestHeaders,
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body,
        };

        try {
            await this.sendRequest(responseParams);
            return this;
        } catch (error) {
            if (error instanceof SyntaxError) {
                // Unexpected token < in JSON
                console.log('There was a SyntaxError', error); // TODO notify alert
            } else {
                console.log('There was an error', error); // TODO notify alert
            }
        }

        return this;
    }


    public sendRequest = async (responseParams: RequestInit) => {

        let response = await fetch(`${this.host}${this.uri}`, responseParams);

        if (!response.ok) {
            alert('Api error');
            this.response = {
                ...{response: {status: response.status}},
            };
        } else {
            let json = await response.json();

            if (typeof json.error != undefined) {
                this.apiError = json.error;

                if (typeof this.onApiErrorHandler == "function" && this.apiError) {
                    this.onApiErrorHandler(this.apiError);
                }
            }

            const respData = {
                ...json,
                ...{response: {status: response.status}},
            };

            if (typeof this.onSuccessHandler == "function") {
                this.onSuccessHandler(respData, this);
            }

            this.response = respData;
        }
    }


    getApiError() {
        if (this.apiError) {
            return this.apiError;
        }
        return null;
    }

}

const ApiFactory = (uri: string, config: {[key: string]: string}) => {
    return new Api(uri, config);
}

export default ApiFactory;
