import { addMinutes } from "date-fns";
import { HandledError } from "@server/services/errors";
import { Ids } from "@server/services/ids";
import { Security } from "@server/services/security";
import { Http, UnknownUserError, ExistingUserError } from "#app/services/http";
import { Users } from "#app/services/users";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { LOG_LEVEL_CONSTANTS } from "@core/services/logging/constants/LogConstant";

export default Http.createAuthRoute({
  type: "post",
  path: "/siwe-callback",
  strategy: "siwe",
  finalizes: true,

  onFail: async (err, req, res, next) => {
    const logger = getServerLogger({ level: LOG_LEVEL_CONSTANTS.LOG_DEBUG });
    logger.debug("received an error executing siwe strategy, may be a new user");
    if (err instanceof UnknownUserError) {
      const { id: address } = err;
      logger.info("creating link token for address: " + address);
      const linkToken = await Security.createToken({
        kind: "link-siwe",
        token: Ids.long(),
        expires: addMinutes(Date.now(), 5),
        address: address,
      });
      logger.debug("new user discovered in siwe callback");
      logger.debug("issuing token: " + linkToken);
      res.json({ action: "register", linkToken });
    } else if (err instanceof ExistingUserError) {
      logger.debug("user already registered");
      res.json({ action: "link" });
    } else if (err instanceof HandledError) {
      logger.error("error performing siwe authentication: " + err);
      next(err);
    } else {
      logger.error("error performing siwe authentication: " + err);
      throw new HandledError("Invalid credentials");
    }
  },
  onSuccess: async (req, res) => {
    const user = await Users.authenticateUser(req, "siwe");
    res.json({ action: "login", user });
  },
});
