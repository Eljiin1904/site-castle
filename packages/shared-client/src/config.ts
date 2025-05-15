import coreConfig, { CoreConfig, setEnvironment } from "@core/config";
import { SystemEnvironment } from "@core/types/system/SystemEnvironment";

export interface FrontendConfig extends CoreConfig {
  apiURL: string;
}

const viteBuildEnv = import.meta.env.VITE_BUILD_ENV;
let env: SystemEnvironment = "development"; // Default to development

const validEnvs: SystemEnvironment[] = ["development", "devcloud", "staging", "production"];

if (viteBuildEnv) {
  if (validEnvs.includes(viteBuildEnv as SystemEnvironment)) {
    env = viteBuildEnv as SystemEnvironment;
  } else {
    console.warn(
      `Invalid VITE_BUILD_ENV value: "${viteBuildEnv}". Defaulting to "development". ` +
      `Valid values are: ${validEnvs.join(", ")}.`,
    );
  }
} else {
  console.warn(
    `VITE_BUILD_ENV is not defined. Defaulting to "development". ` +
    `Ensure this variable is set during the Vite build process (e.g., via Docker build arguments).`,
  );
}

if (["development", "devcloud", "staging", "production"].includes(env)) {
  setEnvironment(env as SystemEnvironment);
} else {
  console.warn(`Invalid environment: ${env}, defaulting to development`);
  setEnvironment("development");
}

const config = coreConfig as FrontendConfig;

export default config as Readonly<FrontendConfig>;
