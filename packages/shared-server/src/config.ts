import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import coreConfig, { CoreConfig, setEnvironment } from "@core/config";
import { SystemEnvironment } from "@core/types/system/SystemEnvironment";

const filePath = fileURLToPath(import.meta.url);
const directory = path.dirname(filePath);
const envPath = path.resolve(directory, "../../../.env");

dotenv.config({ path: envPath });

export interface ServerConfig extends CoreConfig {
  dbUri: string;
  awsId: string;
  awsSecret: string;
  awsRegion: string;

  sessionSecret: string;
  hcaptchaSecret: string;
  cioSiteId: string;
  cioApiKey: string;
  cioTrackKey: string;
  googleClientId: string;
  googleClientSecret: string;
  discordClientId: string;
  discordClientSecret: string;
  twitchClientId: string;
  twitchClientSecret: string;
  hunterApiKey: string;
  vpnApiKey: string;
  eosApiKey: string;
  fireblocksApiKey: string;
  fireblocksSecret: string;
  fireblocksTreasuryId: string;
  fireblocksGasStationId: string;
  fireblocksOmnibusId: string;
  fireblocksWithdrawId: string;
  fireblocksSwappedId: string;
  slackToken: string;
  skinifyToken: string;
  skinsbackId: string;
  skinsbackSecret: string;
  skindeckApiKey: string;
  skindeckSecret: string;
  intercomSecret: string;
  swappedPublicKey: string;
  swappedSecret: string;
  sumsubAppToken: string;
  sumsubSecretKey: string;
  hub88PrivateKey: string;
  hubEightPublicKey: string;
  operatorId: string;
  hubEightApiURL: string;
  redisUrl: string;
  hubEightTestUrl: string;
}

const env = process.env.env || process.env.NODE_ENV || "development";
if (["development", "devcloud", "staging", "production"].includes(env)) {
  setEnvironment(env as SystemEnvironment);
} else {
  console.warn(`Invalid environment: ${env}, defaulting to development`);
  setEnvironment("development");
}

const config = coreConfig as ServerConfig;

config.dbUri = process.env.DB_URI;
config.awsId = process.env.AWS_ID;
config.awsSecret = process.env.AWS_SECRET;
config.awsRegion = process.env.AWS_REGION;
config.redisUrl = process.env.REDIS_URL || "";

export async function loadSecrets(overrides: Record<string, string> = {}) {
  try {
    // Skip secrets loading for staging environment only
    // This avoids permission issues when dev credentials try to access staging secrets

    console.log("fetching secrets");
    let env = config.env as string;
    if (config.env === "devcloud") {
      console.log("The corrent environment is being used is : ", config.env);
      env = "development";
    }

    const client = new SecretsManagerClient({
      region: config.awsRegion,
      credentials: {
        accessKeyId: config.awsId,
        secretAccessKey: config.awsSecret,
      },
    });

    const res = await client.send(
      new GetSecretValueCommand({
        SecretId: `castle-server-${env}`,
      }),
    );
    if (res.SecretString) {
      const secrets = JSON.parse(res.SecretString ?? "") as Partial<ServerConfig>;
      for (const [key, value] of Object.entries(secrets)) {
        if (overrides[key]) {
          (config as any)[key] = overrides[key];
        } else {
          const currentValue = (config as any)[key];
          if (currentValue == null || currentValue == undefined) {
            (config as any)[key] = value;
          }
        }
      }
    }

    const hubSecret = await client.send(
      new GetSecretValueCommand({
        SecretId: `castle-hub88-${env}`,
      }),
    );

    if (hubSecret.SecretString) {
      config.hub88PrivateKey = hubSecret.SecretString;
    }

    // const hubPublicKey = await client.send(
    //   new GetSecretValueCommand({
    //     SecretId: `castle-hub88-public-${env}`,
    //   }),
    // );

    // if (hubPublicKey.SecretString) {
    //   config.hubEightPublicKey = hubPublicKey.SecretString;
    // }
  } catch (e) {
    console.error("ConfigManager.init failed.");
    throw e; // let the process die
  }
}

export default config as Readonly<ServerConfig>;
