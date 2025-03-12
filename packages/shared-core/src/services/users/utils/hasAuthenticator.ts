import { User2faData } from "#core/types/users/User2faData";

export function hasAuthenticator(data: User2faData) {
  return data.enabled;
}
