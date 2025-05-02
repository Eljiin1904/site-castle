export type SiteSettingDocument = {
  _id: SiteSettingId;
  value: SiteSettingValue;
  lastUpdateDate: Date;
};

export type SiteSettingId = keyof SiteSettingObject;

export type SiteSettingValue = SiteSettingObject[SiteSettingId];

export type SiteSettingObject = GeneralSettings &
  CryptoSettings &
  SkinSettings &
  XpSettings &
  RainSettings &
  FeatureToggles &
  ThresholdSettings &
  MarketProviderToggles;

interface GeneralSettings {
  version: string;
  maintenance: boolean;
  announcement: string;
}

interface CryptoSettings {
  manualCryptoWithdraw: boolean;
  cryptoWithdrawSingleMax: number;
  cryptoWithdrawDailyMax: number;
}

interface SkinSettings {
  manualSkinWithdraw: boolean;
  skinWithdrawSingleMax: number;
  skinWithdrawDailyMax: number;
}

interface XpSettings {
  gemRate: number;
  casesXpRate: number;
  caseBattlesXpRate: number;
  doubleXpRate: number;
  diceXpRate: number;
  limboXpRate: number;
  minesXpRate: number;
}

interface RainSettings {
  rainTaxRate: number;
  rainBaseAmount: number;
  rainMinInterval: number;
  rainMaxInterval: number;
  rainDuration: number;
  rainWagerRequirement: number;
}

interface FeatureToggles {
  cryptoWithdrawsEnabled: boolean;
  skinDepositsEnabled: boolean;
  skinWithdrawsEnabled: boolean;
  tippingEnabled: boolean;
  affiliatesEnabled: boolean;
  rewardsEnabled: boolean;
  rainEnabled: boolean;
  chatEnabled: boolean;
  casesEnabled: boolean;
  caseBattlesEnabled: boolean;
  diceEnabled: boolean;
  doubleEnabled: boolean;
  crashEnabled: boolean;
  limboEnabled: boolean;
  minesEnabled: boolean;
}

interface ThresholdSettings {
  activityThreshold: number;
  betHighrollerThreshold: number;
  betLuckyThreshold: number;
  chatGeneralRequirement: number;
  chatHighrollerRequirement: number;
  jackpotThreshold: number;
}

interface MarketProviderToggles {
  skinifyEnabled: boolean;
  skinsbackEnabled: boolean;
  skindeckEnabled: boolean;
}
