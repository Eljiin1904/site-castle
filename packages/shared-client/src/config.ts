import coreConfig, { CoreConfig, setEnvironment } from "@core/config";

export interface FrontendConfig extends CoreConfig {
  apiURL: string;
}

setEnvironment(process.env.APP_ENV);

const config = coreConfig as FrontendConfig;

export default config as Readonly<FrontendConfig>;
