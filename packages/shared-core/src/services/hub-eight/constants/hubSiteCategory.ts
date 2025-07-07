import { SiteSettingId } from "#core/types/site/SiteSettingDocument";

export const hubEightToggleNameMap = {
  slot: "slotEnabled",
  game_shows: "gameShowEnabled",
  casino: "casinoEnabled",
  live: "liveEnabled",
};

export const siteCategoryEnables: SiteSettingId[] = [
  "slotEnabled",
  "gameShowEnabled",
  "casinoEnabled",
  "liveGameEnabled",
];
