import { AuthenticatedUser } from "@core/types/users/AuthenticatedUser";
import { Http } from "@client/services/http";

export function linkAccount({
  ...data
}: {
  provider: string;
  userId: string;
  password: string;
  providerId: string;
}): Promise<{
  user: AuthenticatedUser;
  action?: "authenticated" | "password-wrong" | null;
}> {
  return Http.post("/auth/link-account", data);
}
