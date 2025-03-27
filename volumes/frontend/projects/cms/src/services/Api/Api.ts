import {Api as ApiPorabote} from "@packages/porabote";
import config from "../../../config";

const ApiFactory = (uri: string) => {
  return ApiPorabote(uri, config);
}

export default ApiFactory;