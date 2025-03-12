import type { UserRole } from "./UserRole";
import type { UserTag } from "./UserTag";

export interface BasicUser {
  id: string;
  name: string;
  role: UserRole;
  tags: UserTag[];
  avatarIndex: number;
  avatarId?: string;
  xp: number;
  hidden: boolean;
}
