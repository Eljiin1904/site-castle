import type {
  RewardProductKind,
  RewardProductKindData,
} from "./RewardProductKind";

export type RewardProductDocument = {
  _id: string;
  kind: RewardProductKind;
  displayName: string;
  slug: string;
  imageId: string;
  gemCost: number;
  createDate: Date;
  editDate: Date;
  disabled: boolean;
  featured?: boolean;
} & RewardProductKindData;
