import { AuthenticatedUser } from "@core/types/users/AuthenticatedUser";
import { push } from "./push";

export function trackRegister({
  user,
  strategy,
}: {
  user: AuthenticatedUser;
  strategy: string;
}) {
  push({
    event: "register",
    userId: user._id,
    username: user.username,
    email: user.email,
    strategy,
  });
}
