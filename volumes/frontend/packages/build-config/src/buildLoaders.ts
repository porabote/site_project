import {ModuleOptions} from "webpack";
import {resolve} from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type {BuildWebpackPropsType} from "./types/types";

export function buildLoaders(options: BuildWebpackPropsType): ModuleOptions["rules"] {

  return [
    {
      test: /\.([cm]?ts|tsx)$/,
      loader: "ts-loader",
      options: {transpileOnly: true},
      exclude: /node_modules/,
    },
    {
      test: /\.(less|css)$/,
      use: [
        options.mode == "development" ? "style-loader" : MiniCssExtractPlugin.loader, // creates style nodes from JS strings,
        "css-loader", // translates CSS into CommonJS,
        "less-loader", // compiles Less to CSS,
      ],
    },
    {
      test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
      loader: "file-loader",
    },
    {
      test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
      type: "asset/inline",
    },
  ];
}