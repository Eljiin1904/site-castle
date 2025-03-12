import type { TransactionKind, TransactionKindData } from "./TransactionKind";
import type { TransactionCategory } from "./TransactionCategory";
import type { TransactionTag } from "./TransactionTag";
import type { TransactionStatus } from "./TransactionStatus";
import type { TransactionUser } from "./TransactionUser";
import type { TransactionAffiliate } from "./TransactionAffiliate";
import type { UserStats } from "../users/UserStats";
import type { UserReferer } from "../users/UserReferer";

export type TransactionDocument = {
  _id: string;
  timestamp: Date;
  user: TransactionUser;
  referer: UserReferer;
  affiliate: TransactionAffiliate | null;
  category: TransactionCategory;
  kind: TransactionKind;
  tags: TransactionTag[];
  amount: number;
  value: number;
  balance: number;
  status: TransactionStatus;
  statusDate: Date;
  stats?: Partial<UserStats>;
  note?: string;
} & TransactionKindData;
