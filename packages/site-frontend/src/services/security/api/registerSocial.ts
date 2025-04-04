import { AuthenticatedUser } from "@core/types/users/AuthenticatedUser";
import { Http } from "@client/services/http";

export function registerSocial({
  provider,
  ...data
}: {
  provider: string;
  username: string;
  email?: string | undefined;
  password: string;
  linkToken: string;
  referralCode: string | undefined;
}): Promise<{
  action: "link-to-other-provider" | null;
  providerId: string | null;
  user: AuthenticatedUser;
  userId: string | null;
}> {
  return Http.post(`/register/${provider}`, data);
}
