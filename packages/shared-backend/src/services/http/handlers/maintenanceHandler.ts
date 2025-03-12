import { HandledError } from "@server/services/errors";
import { Http } from "@server/services/http";
import { Users } from "@server/services/users";
import { Site } from "@server/services/site";

export const maintenanceHandler = Http.createHandler(async (req, res, next) => {
  const settings = await Site.settings.cache();

  if (
    settings.maintenance &&
    !(req.user && Users.getPermissions(req.user.role).maintenanceAccess)
  ) {
    throw new HandledError("Site under maintenance.");
  }

  next();
});
