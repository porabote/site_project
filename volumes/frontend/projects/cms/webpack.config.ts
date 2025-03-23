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
    porabote: resolve(__dirname, '../../packages/porabote', 'src', 'index.ts'),
    host: resolve(__dirname, '../../services/host', 'src', 'index.ts'),
  }

  const MINER_REPORT_REMOTE_URL = mode == 'development'
      ? `https://${hostConfigs.domain}:7006` : `https://${hostConfigs.domain}/miner-report`;
  // const ERP_REMOTE_URL = mode == 'development'
  //   ? `https://${hostConfigs.domain}:7005` : `https://${hostConfigs.domain}/erp`;
  // const CRM_REMOTE_URL = mode == 'development'
  //   ? `https://${hostConfigs.domain}:7002` : `https://${hostConfigs.domain}/crm`;
  // const AUTH_REMOTE_URL = mode == 'development'
  //   ? `https://${hostConfigs.domain}:7003` : `https://${hostConfigs.domain}/auth`;

  const config: webpack.Configuration = buildWebpack({
    host: {...hostConfigs},
    mode: mode ?? 'development',
    paths,
    // analyzer: env.analyzer,
    // platform: env.platform ?? 'desktop'
  });

  config.plugins.push(new webpack.container.ModuleFederationPlugin({
    name: 'porabote_host',
  //  runtime: 'my-runtime-name-host',
    filename: 'remoteEntry.js',
    remotes: {
      'porabote_miner_report': `porabote_miner_report@${MINER_REPORT_REMOTE_URL}/remoteEntry.js`,
      // 'porabote_auth': `porabote_auth@${AUTH_REMOTE_URL}/remoteEntry.js`,
      // 'porabote_erp': `porabote_erp@${ERP_REMOTE_URL}/remoteEntry.js`,
      // 'porabote_crm': `porabote_crm@${CRM_REMOTE_URL}/remoteEntry.js`
    },
    shared: {
      ...packageJson.dependencies,
      react: {
        eager: true,
        requiredVersion: packageJson.dependencies['react'],
      },
      'react-router-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-router-dom'],
      },
      'react-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-dom'],
      }
    }
  }));

  return config;
}