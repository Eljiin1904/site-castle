import type { HolidayEvent } from "../rewards/HolidayEventDocument";
import type { SiteRace } from "./SiteRace";

export type SiteMetaDocument = {
  _id: SiteMetaId;
  value: SiteMetaValue;
  lastUpdateDate: Date;
};

export type SiteMetaId = keyof SiteMetaObject;

export type SiteMetaValue = SiteMetaObject[SiteMetaId];

export interface SiteMetaObject {
  activeCount: number;
  races: SiteRace[] | null;
  holiday: HolidayEvent | null;
  market: {
    totalCount: number;
    totalUsd: number;
  };
}
