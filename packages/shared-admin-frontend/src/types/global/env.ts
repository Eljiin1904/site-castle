import type { SystemEnvironment } from "@core/types/system/SystemEnvironment";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: SystemEnvironment;
    }
  }
}

export {};
