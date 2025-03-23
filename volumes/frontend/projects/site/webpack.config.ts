import { fileURLToPath } from 'url';
import {join, dirname, resolve} from "path";
import {EnvVariables, BuildPaths, buildWebpack} from "@packages/build-config";
import webpack from 'webpack';
import hostConfigs from "./host.configs";
import packageJson from "./package.json";

export default ({mode}: EnvVariables) => {

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const paths: BuildPaths = {
    output: (mode == "production") ? resolve(__dirname, 'build') : resolve(__dirname, 'dist'),
    entry: resolve(__dirname, 'src', 'index.ts'),
    html: resolve(__dirname, 'public', 'index.html'),
    public: resolve(__dirname, 'public'),
    src: resolve(__dirname, 'src'),
    porabote: resolve(__dirname, '../packages/porabote', 'src', 'index.ts'),
  }

  const config: webpack.Configuration = buildWebpack({
    host: {...hostConfigs},
    mode: mode ?? 'development',
    paths,
    // analyzer: env.analyzer,
    // platform: env.platform ?? 'desktop'
  });

  // config.plugins.push(new webpack.container.ModuleFederationPlugin({
  //   name: 'porabote_host',
  //   filename: 'remoteEntry.js',
  //   shared: {
  //     ...packageJson.dependencies,
  //     react: {
  //       eager: true,
  //       requiredVersion: packageJson.dependencies['react'],
  //     },
  //     'react-router-dom': {
  //       eager: true,
  //       requiredVersion: packageJson.dependencies['react-router-dom'],
  //     },
  //     'react-dom': {
  //       eager: true,
  //       requiredVersion: packageJson.dependencies['react-dom'],
  //     }
  //   }
  // }));

  return config;
}