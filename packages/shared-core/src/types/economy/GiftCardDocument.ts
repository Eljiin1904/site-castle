import type { BasicUser } from "../users/BasicUser";
import type { UserLocation } from "../users/UserLocation";
import type { GiftCardTag } from "./GiftCardTag";

export type GiftCardDocument = {
  _id: string;
  timestamp: Date;
  batchId: string;
  tokenAmount: number;
  tag: GiftCardTag;
  used?: boolean;
} & (
  | {
      used?: undefined;
    }
  | {
      used: true;
      user: BasicUser;
      useDate: Date;
      useLocation: UserLocation;
    }
);
