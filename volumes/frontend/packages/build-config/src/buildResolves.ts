import {Configuration} from "webpack";
import {resolve} from "path";
import {BuildWebpackPropsType} from "./types/types";

export function buildResolves(options: BuildWebpackPropsType): Configuration['resolve'] {
  return {
    // fallback: {
    //   'react/jsx-runtime': 'react/jsx-runtime.js',
    //   'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
    // },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".ttf"],
    alias: {
      "@": options.paths.src,
      "@porabote": "@packages/porabote/src",
      "@porabote/*": "@packages/porabote/src",
      "@host/*": "@services/host/src",
    },
  }
}