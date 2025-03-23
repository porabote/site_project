import {resolve} from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import webpack, {Configuration, ModuleOptions} from "webpack";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type {BuildWebpackPropsType} from "./types/types";
//import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

export function buildPlugins(options: BuildWebpackPropsType): Configuration["plugins"] {

  const {mode, paths} = options;

  return [
    new CopyPlugin({
      patterns: [
        {
          //  from: "public", to: "test"
          from: "./public/js",
          to: '',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: paths.html,
      //favicon: resolve(paths.public, 'favicon.ico'),
      publicPath: '/'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[fullhash].bundle.css",
      chunkFilename: "css/[name].[fullhash].bundle.css",
    }),
    new CleanWebpackPlugin({}),
    new ESLintPlugin({
      exclude: ["node_modules"],
    }),
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      "BASENAME": JSON.stringify(process.env.DOMAIN),
      "API_URL": JSON.stringify(process.env.API_URL),
      "AUTH_URL": JSON.stringify(process.env.AUTH_URL),
    }),
  ].filter(Boolean);
}