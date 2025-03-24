import { Database } from "@server/services/database";
import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Users } from "#app/services/users";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

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
    const { username, email, password, referralCode, linkToken } = req.body;

    if (await Database.exists("users", { email }, { collation: { locale: "en", strength: 2 } })) {
      logger.info("email already registered");
      throw new HandledError("Email is already registered.");
    }
    if (
      await Database.exists("users", { username }, { collation: { locale: "en", strength: 2 } })
    ) {
      throw new HandledError("Username is already taken.");
    }

    await Site.validateEmail(email);

    const { address } = await Security.getToken({
      kind: "link-siwe",
      token: linkToken,
    });
    logger.debug("fetching token: " + linkToken);

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
