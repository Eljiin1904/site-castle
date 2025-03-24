import frontendConfig, { FrontendConfig } from "@client/config";

export interface SiteFrontendConfig extends FrontendConfig {
  version: string;
  twitterHandle: string;
  twitterURL: string;
  discordURL: string;
  telegramURL: string;
  hcaptchaSiteKey: string;
  pushPublicKey: string;
  intercomAppId: string;
  gtmId: string;
}

const config = frontendConfig as SiteFrontendConfig;

config.system = "site-frontend";
config.apiURL = config.siteAPI;
config.version = "9.0.0";
config.twitterHandle = "@chickendotgg";
config.twitterURL = "https://x.com/chickendotgg";
config.discordURL = "https://discord.com/invite/chickengg";
config.telegramURL = "https://t.me/chickendotgg";
config.instagramURL = "https://t.me/chickendotgg";
config.intercomAppId = "b81gk8j9";
config.gtmId = "GTM-WV5NCV94";

if (config.env === "development" || config.env === "devcloud") {
  config.hcaptchaSiteKey = "3ccdf630-d540-4b65-86ef-5d0fc271d413";
  config.pushPublicKey =
    "BBl1yTH6ECaTopuCeLJFoAUGIVxiLILGQ0yRnMSirc4C7FqYpTqt7rmjP4udqwMmNo0b4AdyMQhcCNjQHtUf1iQ";
} else if (config.env === "staging") {
  config.hcaptchaSiteKey = "79d79216-5920-4490-8670-0e951bb0d1cb";
  config.pushPublicKey =
    "BBl1yTH6ECaTopuCeLJFoAUGIVxiLILGQ0yRnMSirc4C7FqYpTqt7rmjP4udqwMmNo0b4AdyMQhcCNjQHtUf1iQ";
} else if (config.env === "production") {
  config.hcaptchaSiteKey = "cb71e513-51c1-458d-b122-1e0b81d571aa";
  config.pushPublicKey =
    "BJWirlm9gty64bCzIjWOSHhZPCLAmUyaroN9kf6H1ptm50qUwpOZZQIqqnPCNctAoNASvJFeaH6C740P2Y0x8J0";
}

export default config as Readonly<SiteFrontendConfig>;
