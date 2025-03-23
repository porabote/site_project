import {join, dirname} from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const APP_DOMAIN_BASE = "porabote-zaborstoit.porabote.ru";
export const API_URL = `https://zaborstoit.porabote.ru/api`;
export const API_VERSION = 1;
export const API_CLIENT_ID = 4;
export const FILES_URL = `https://${APP_DOMAIN_BASE}/files`;
export const AUTH_URL = `https://${APP_DOMAIN_BASE}/api/auth`;
export const ACCESS_TOKEN_NAME = "porabote_access_token";
export const CHAT_DOMAIN = `wss://${APP_DOMAIN_BASE}`;
export const CHAT_PORT = "4000";

const config =  {
  domain: "porabote-zaborstoit.porabote.ru",
  port: 7000,
  certPath: join(__dirname, "./.cert/cert.crt"),
  certKeyPath: join(__dirname, "./.cert/key.key"),
  certCaPath: join(__dirname, "./.cert/ca.pem"),
  chainKeyPath: "./.cert/chain.pem",
}

export default config;