import type { SystemEnvironment } from "@core/types/system/SystemEnvironment";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: SystemEnvironment;
      PORT: string | undefined;
      AWS_ID: string;
      AWS_SECRET: string;
      AWS_REGION: string;
      DB_URI: string;
    }
  }
}

export {};
