import type { SystemEnvironment } from "@core/types/system/SystemEnvironment";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: SystemEnvironment;
      AWS_ID: string;
      AWS_SECRET: string;
      AWS_REGION: string;
      DISCORD_BOT_TOKEN: string;
    }
  }
}

export {};
