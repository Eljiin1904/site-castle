import { AdminUser } from "@core/types/admin/AdminUser";
import { Http } from "@client/services/http";

export function authSession(): Promise<{
  authenticated: boolean;
  user: AdminUser;
}> {
  return Http.post("/auth/session");
}
