import type { UserRole } from "../users/UserRole";

export interface AdminUser {
  userId: string;
  username: string;
  role: UserRole;
}
