import { Validation } from "@core/services/validation";
import { Security } from "@server/services/security";
import { Http, UserLinkedElsewhereError } from "#app/services/http";
import { Users } from "#app/services/users";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { isAlreadyRegistered } from "./utils";

export default Http.createApiRoute({
  type: "post",
  path: "/steam",
  secure: false,
  body: Validation.object({
    username: Validation.username(),
    email: Validation.email(),
    password: Validation.password(),
    referralCode: Validation.string(),
    linkToken: Validation.token(),
  }),
  callback: async (req, res) => {
    const logger = getServerLogger({});
    logger.debug("authenticating via Steam");
    const { username, email, password, referralCode, linkToken } = req.body;

    const { steamId } = await Security.getToken({
      kind: "link-steam",
      token: linkToken,
    });

    // this function will return an error if not
    try {
      await isAlreadyRegistered(email, username, steamId);
    } catch (err) {
      if (err instanceof UserLinkedElsewhereError) {
        res.json({
          action: "link-to-other-provider",
          userId: err.userId,
          providerId: err.providerId,
        });
      } else {
        logger.error("unexpected error verifying if user is already registered");
      }
      return;
    }

    const user = await Users.registerUser(req, {
      strategy: "steam",
      username,
      steamId,
      email,
      emailConfirmed: false,
      password,
      referralCode,
    });

    await Security.consumeToken({
      kind: "link-steam",
      token: linkToken,
    });

    res.json({ user });
  },
});
