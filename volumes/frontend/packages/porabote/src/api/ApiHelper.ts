

export const objectToQuerystring = (obj: { [key: string]: any }, prefix: string | null = null) => {
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

  export const queryStringToObject = (uri: string) => {

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