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
  user: AuthenticatedUser;
}> {
  return Http.post(`/register/${provider}`, data);
}
