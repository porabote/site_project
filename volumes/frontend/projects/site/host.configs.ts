import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const config =  {
  domain: "thyssenmining.ru",
  port: 3000,
  certPath: join(__dirname, "./.cert/cert.crt"),
  certKeyPath: join(__dirname, "./.cert/key.key"),
  certCaPath: join(__dirname, "./.cert/ca.pem"),
  chainKeyPath: "./.cert/chain.pem",
}

export default config;