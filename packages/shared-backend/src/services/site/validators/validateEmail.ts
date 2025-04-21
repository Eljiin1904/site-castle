import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export async function validateEmail(email: string) {
  const info = await Http.getEmailInfo(email);

  if (info.status === "invalid") {
    throw new HandledError("validations:errors.email.invalid");
  }

  if (info.status === "disposable") {
    throw new HandledError("Invalid email domain.");
  }
}
