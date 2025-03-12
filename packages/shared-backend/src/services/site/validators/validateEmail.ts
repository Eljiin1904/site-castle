import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

export async function validateEmail(email: string) {
  const info = await Http.getEmailInfo(email);
  const logger = getServerLogger({});

  if (info.status === "invalid") {
    logger.info(email + " is an invalid email address");
    throw new HandledError("Invalid email address.");
  }

  if (info.status === "disposable") {
    logger.info(email + " is judged to be a disposable email domain");
    throw new HandledError("Invalid email domain.");
  }
}
