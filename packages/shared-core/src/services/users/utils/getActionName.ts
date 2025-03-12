import { Strings } from "#core/services/strings";
import { UserActionKind } from "#core/types/users/UserActionKind";

export function getActionName(kind: UserActionKind) {
  switch (kind) {
    case "email-edit":
      return "Edit Email";
    case "login":
      return "Login";
    case "password-edit":
      return "Edit Password";
    case "password-recover":
      return "Recover Password";
    case "register":
      return "Register";
    case "tfa-disable":
      return "Disable 2FA";
    case "tfa-enable":
      return "Enable 2FA";
    default:
      return Strings.kebabToTitle(kind);
  }
}
