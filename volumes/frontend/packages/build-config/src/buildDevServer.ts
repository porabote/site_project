import {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {join, resolve} from "path";
import fs from "fs";
import type {BuildWebpackPropsType} from "./types/types";

export function buildDevServer(options: BuildWebpackPropsType): DevServerConfiguration {

  const {paths} = options;
  
  return  {
    historyApiFallback: true,
    allowedHosts: "all",
    host: options.host.domain,
    port: options.host.port,
    static: paths.output,
    open: true,
    compress: true,
    hot: false,
    server:
      {
        type: 'https',
        options: {
          key: fs.readFileSync(options.host.certKeyPath),
          cert: fs.readFileSync(options.host.certPath),
          ca: fs.readFileSync(options.host.certCaPath),
          requestCert: false,
          //   minVersion: 'TLSv1.1',
        }
      },
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      if (devServer.server) {
        const port = devServer.server.address();
        console.log('Listening on port:', port);
      }
    },
    proxy: [
      {
        context: ['/files'],
        target: `https://${options.host.domain}`,
      }
    ],
  };
}