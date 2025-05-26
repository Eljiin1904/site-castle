import coreConfig, { CoreConfig } from "@core/config";
import { SystemEnvironment } from "@core/types/system/SystemEnvironment";

export interface FrontendConfig extends CoreConfig {
  apiURL: string;
}

const config = coreConfig as FrontendConfig;

export default config as Readonly<FrontendConfig>;
