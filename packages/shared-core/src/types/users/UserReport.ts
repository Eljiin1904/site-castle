import type { UserRole } from "./UserRole";
import type { UserStats } from "./UserStats";
import type { UserTag } from "./UserTag";

export interface UserReportDocument extends UserReport {
  _id: string;
  timeframe: Date;
  userId: string;
  userRole: UserRole;
  userTags: UserTag[];
}

export interface UserReport extends Required<UserStats> {
  xpGained: number;
  gemsSpent: number;
  holidaySpent: number;
}
