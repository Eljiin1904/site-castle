import { Validation } from "#core/services/validation";
import { externalGameCategories } from "#core/types/hub-eight/GameInformation";

// TODO - Confirm fields that should be allowed to be updated

export const updateHubEightGameSchema = Validation.object({
  url_thumb: Validation.string().url(),
  url_background: Validation.string().url(),
  // product: Validation.string(),
  // platforms: Validation.array(),
  name: Validation.string(),
  // supplier_identifier: Validation.string(),
  // freebet_support: Validation.boolean(),
  // demo_game_support: Validation.boolean(),
  enabled: Validation.boolean(),
  // category: Validation.string(),
  // blocked_countries: Validation.array().of(Validation.string().length(2)), // ISO country codes "EE"
  // release_date: Validation.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Must be ISO date// Could be enum if you define Volatility type
  rtp: Validation.string().matches(/^\d+(\.\d+)?$/, "RTP must be a number string"), // e.g., "96.5"
  paylines: Validation.number().integer().min(0),
  hit_ratio: Validation.string().matches(/^\d+(\.\d+)?$/, "Hit ratio must be a number string"),
  // certifications: Validation.array().of(Validation.string()),
  // languages: Validation.array().of(Validation.string().length(2)), // ISO language codes "en"
  // theme: Validation.array().of(Validation.string()),
  // technology: Validation.array().of(Validation.string()),
  // features: Validation.array().of(Validation.string()),
  live_game: Validation.boolean(),
  featured: Validation.boolean(),
  // bonus_buy: Validation.boolean(),
  // tags: Validation.array().of(Validation.string()),
  site_category: Validation.string().oneOf(externalGameCategories),
})
  .test("has-at-least-one-key", "Update must have at least one field", (value) => {
    return value && Object.keys(value).length > 0;
  })
  .required();
