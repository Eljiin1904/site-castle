import { Validation } from "@core/services/validation";
import { Security } from "@server/services/security";
import { Http, UserLinkedElsewhereError } from "#app/services/http";
import { Users } from "#app/services/users";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { isAlreadyRegistered } from "./utils";

export default Http.createApiRoute({
  type: "post",
  path: "/siwe",
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
    logger.debug("registering new user with wallet");
    const { username, email, password, referralCode, linkToken } = req.body;

    const { address } = await Security.getToken({
      kind: "link-siwe",
      token: linkToken,
    });
    logger.debug("fetching token: " + linkToken);

    try {
      await isAlreadyRegistered(email, username, address);
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

    const walletAddress = address;

    const user = await Users.registerUser(req, {
      strategy: "siwe",
      username,
      walletAddress,
      email,
      emailConfirmed: false,
      password,
      referralCode,
    });

    await Security.consumeToken({
      kind: "link-siwe",
      token: linkToken,
    });

    res.json({ user });
  },
});
