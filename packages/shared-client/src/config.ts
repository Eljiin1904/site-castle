import coreConfig, { CoreConfig, setEnvironment } from "@core/config";
import { SystemEnvironment } from "@core/types/system/SystemEnvironment";

export interface FrontendConfig extends CoreConfig {
  apiURL: string;
}

const env = process.env.env || "development";
if (["development", "devcloud", "staging", "production"].includes(env)) {
  setEnvironment(env as SystemEnvironment);
} else {
  console.warn(`Invalid environment: ${env}, defaulting to development`);
  setEnvironment("development");
}

const config = coreConfig as FrontendConfig;

export default config as Readonly<FrontendConfig>;
