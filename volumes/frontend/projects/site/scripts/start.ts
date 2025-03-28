import webpack from "webpack";
import {killPortProcess} from 'kill-port-process';
import WebpackDevServer from 'webpack-dev-server';
import hostConfigs from '../host.configs';
import webpackConfig from "../webpack.config";

const killPort = async (port: number|string) => {
  await killPortProcess(hostConfigs.port, {signal: 'SIGTERM'});
};

const start = async () => {

  let conf = webpackConfig({mode: "development"});

  const PORT = hostConfigs.port ?? 3000;
  const HOST = hostConfigs.domain ?? 'localhost';

  await killPort(PORT).catch((e) => {
    //console.log(e);
  });

  const compiler = webpack(conf);

  compiler.watch({}, () => {
    //resolve()
  });

  return new Promise((resolve, reject) => {
    const devServerOptions = Object.assign({}, conf.devServer, {
      host: HOST,
    });

    const devServer = new WebpackDevServer(devServerOptions, compiler)

    devServer.start();

    return resolve('Compiled successfully.');

  }).catch(err => {
    console.log(err);
  });
};

let startPromise = start();

const isStarted = (res: any) => {
  console.log(`Server is started`);
}

const isStartFailed = (res: Error) => {
  console.log(res);
  console.log(`Server start FAIL!`);
}

startPromise.then(isStarted, isStartFailed);