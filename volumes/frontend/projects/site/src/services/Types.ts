export type ApiGetType = {
  url?: string;
  query?: any[];
  headers?: { [key: string]: string };
  credentials?: 'omit' | 'same-origin' | 'include';
}

export type ResponseMetaType = {
  offset: number;
  perPage: number;
  count: number;
  fetchData: () => void;
};

export type RecordType<RecordDataSet> = {
  id: number;
  attributes: RecordDataSet;
  meta: ResponseMetaType;
};

export type FetchParamsType = {
  method: "GET" | "POST",
  mode: "cors" | "navigate" | "no-cors" | "same-origin" | "websocket",
  cache: "no-cache" | "default" | "no-store" | "reload" | "force-cache" | "only-if-cached",
  credentials: 'omit' | 'same-origin' | 'include',
  headers: Headers,
  redirect: "follow" | "error" | "manual",
  referrerPolicy: "no-referrer" | "origin" | "same-origin" | "strict-origin-when-cross-origin" | "no-referrer-when-downgrade"
    | "origin-when-cross-origin" | "strict-origin" | "unsafe-url",
}