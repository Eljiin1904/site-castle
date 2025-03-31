import { SiteSettingId, SiteSettingObject } from "@core/types/site/SiteSettingDocument";
import { Database } from "@server/services/database";
import { Site } from "@server/services/site";
import { System } from "@server/services/system";

export default () => System.tryCatch(main)();

async function main() {
  await insertDefault("version", "0.0.1");
  await insertDefault("maintenance", false);
  await insertDefault("announcement", "");

  await insertDefault("manualCryptoWithdraw", false);
  await insertDefault("cryptoWithdrawSingleMax", 2000.0);
  await insertDefault("cryptoWithdrawDailyMax", 5000.0);

  await insertDefault("manualSkinWithdraw", false);
  await insertDefault("skinWithdrawSingleMax", 2000.0);
  await insertDefault("skinWithdrawDailyMax", 5000.0);

  await insertDefault("gemRate", 1.0);
  await insertDefault("casesXpRate", 1.0);
  await insertDefault("caseBattlesXpRate", 1.0);
  await insertDefault("doubleXpRate", 1.0);
  await insertDefault("diceXpRate", 0.6);
  await insertDefault("limboXpRate", 0.6);

  await insertDefault("rainTaxRate", 0.01);
  await insertDefault("rainBaseAmount", 10.0);
  await insertDefault("rainMinInterval", 30);
  await insertDefault("rainMaxInterval", 60);
  await insertDefault("rainDuration", 2);
  await insertDefault("rainWagerRequirement", 50);

  await insertDefault("cryptoWithdrawsEnabled", true);
  await insertDefault("skinDepositsEnabled", true);
  await insertDefault("skinWithdrawsEnabled", true);
  await insertDefault("tippingEnabled", true);
  await insertDefault("affiliatesEnabled", true);
  await insertDefault("rewardsEnabled", true);
  await insertDefault("rainEnabled", true);
  await insertDefault("chatEnabled", true);
  await insertDefault("casesEnabled", true);
  await insertDefault("caseBattlesEnabled", true);
  await insertDefault("doubleEnabled", true);
  await insertDefault("diceEnabled", true);
  await insertDefault("limboEnabled", true);

  await insertDefault("activityThreshold", 0.01);
  await insertDefault("betHighrollerThreshold", 100);
  await insertDefault("betLuckyThreshold", 5);
  await insertDefault("jackpotThreshold", 0.0066666);
  await insertDefault("chatGeneralRequirement", 0);
  await insertDefault("chatHighrollerRequirement", 50);

  await insertDefault("skinifyEnabled", true);
  await insertDefault("skinsbackEnabled", true);
  await insertDefault("skindeckEnabled", true);
}

async function insertDefault<K extends SiteSettingId>(_id: K, value: SiteSettingObject[K]) {
  const settings = await Site.settings.cache();

  if (settings[_id] !== undefined) {
    return;
  }

  await Database.collection("site-settings").insertOne({
    _id,
    value,
    lastUpdateDate: new Date(),
  });
}
