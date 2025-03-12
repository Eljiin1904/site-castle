import type { PlayerUser } from "../users/PlayerUser";
import type {
  SiteActivityKind,
  SiteActivityKindData,
} from "./SiteActivityKind";

export type SiteActivityDocument = {
  _id: string;
  timestamp: Date;
  kind: SiteActivityKind;
  user: PlayerUser;
  amount: number;
  expires: Date;
} & SiteActivityKindData;
