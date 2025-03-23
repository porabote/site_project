export type BuildMode = 'production' | 'development';
export type BuildPlatform = 'mobile' | 'desktop';

export type BuildWebpackPropsType = {
  mode: BuildMode;
  paths: BuildPaths;
  host: {
    domain: string;
    port: number;
    certPath: string;
    certKeyPath: string;
    certCaPath?: string;
    chainKeyPath?: string;
  }
};

export interface BuildPaths {
  entry: string | {[key: string]: string};
  html: string;
  public: string;
  output: string;
  src: string;
  porabote?: string;
  host?: string;
}

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  platform: BuildPlatform;
  analyzer?: boolean;
}

export interface EnvVariables {
  mode?: BuildMode;
  // analyzer?: boolean;
  // port?: number;
  // platform?: BuildPlatform;
  // SHOP_REMOTE_URL?: string
  // ADMIN_REMOTE_URL?: string
}