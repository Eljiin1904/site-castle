import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { UserLinkedElsewhereError } from "#app/services/http";
import { Site } from "#app/services/site";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { validatePassword } from "../../services/site/validators/validatePassword";

// isAlreadyRegistered sees if the username or email already exists
export async function isAlreadyRegistered(email: string, username: string, providerId: string) {
  const logger = getServerLogger({});
  const userWithId = await Database.collection("users").findOne(
    { email: email },
    { collation: { locale: "en", strength: 2 } },
  );
  if (userWithId) {
    logger.debug("authenticated via provider, but email already exists: " + email);
    throw new UserLinkedElsewhereError(userWithId._id, providerId);
  } else if (
    await Database.exists("users", { username }, { collation: { locale: "en", strength: 2 } })
  ) {
    throw new HandledError("errors.username.taken");
  } else {
    await Site.validateEmail(email);
  }
}
