import webpack from "webpack";
import {join, resolve} from "path";
import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolves} from "./buildResolves";
import type {BuildWebpackPropsType} from "./types/types";

export function buildWebpack(options: BuildWebpackPropsType): webpack.Configuration {

  const {mode, paths} = options;

  return {
    entry: paths.entry,
    mode: mode,
    bail: mode == "production",
   // context: join(__dirname, "../../"),
    // target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    stats: "errors-warnings",
    watchOptions: {
      ignored: ['**/node_modules'],
      aggregateTimeout: 600,
      poll: 1000,
    },
    output: {
      path: paths.output,
      filename: "[name].[contenthash].bundle.js",
      publicPath: 'auto', //(mode == "production") ? "/" : "/"
      clean: true,
      asyncChunks: true,
    },
    resolve: buildResolves(options),
    module: { rules: buildLoaders(options)},
    plugins: buildPlugins(options),
    devtool: mode == "development" ? 'eval-cheap-source-map' : 'source-map',
    devServer: mode == "development" ? buildDevServer(options) : undefined,
  }
}