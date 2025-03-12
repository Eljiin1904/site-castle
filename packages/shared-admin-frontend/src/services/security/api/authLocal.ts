import { AdminUser } from "@core/types/admin/AdminUser";
import { Http } from "@client/services/http";

export function authLocal(data: {
  username: string;
  password: string;
}): Promise<{
  user: AdminUser;
}> {
  return Http.post("/auth/local", data);
}
