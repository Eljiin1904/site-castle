import { Database } from "@server/services/database";
import { Validation } from "@core/services/validation";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { HandledError } from "@server/services/errors";
import { validatePassword } from "#app/services/site/Site";
import { DotNestedKeys } from "@core/types/utility/DotNestedKeys";
import { UserDocument } from "@core/types/users/UserDocument";

export default Http.createApiRoute({
  type: "post",
  path: "/link-account",
  secure: false,
  body: Validation.object({
    provider: Validation.string().required({
      key: "validations.password.required",
      value: "Password",
    }),
    providerId: Validation.string(),
    userId: Validation.string(),
    password: Validation.password(),
  }),
  callback: async (req, res) => {
    const logger = getServerLogger({});
    logger.debug("linking userId to provider");
    const { provider, userId, password, providerId } = req.body;
    logger.info("received provider ID: " + providerId + " to link to user: " + userId);

    const userWithId = await Database.collection("users").findOne({ _id: userId });
    if (!userWithId) {
      logger.error("unable to find user to link account with: " + userId);
    }

    // let's confirm the password first
    const { ...user } = userWithId;
    try {
      await validatePassword(user, password);
    } catch {
      logger.info("received incorrect password to link user: " + user._id);
      res.json({ action: "password-wrong" });
      return;
    }

    let field: DotNestedKeys<UserDocument>;
    if (provider === "discord") {
      field = "discordId";
    } else if (provider === "google") {
      field = "googleId";
    } else if (provider === "siwe") {
      field = "walletAddress";
    } else if (provider === "steam") {
      field = "steamId";
    } else if (provider === "twitch") {
      field = "twitchId";
    } else {
      throw new HandledError(`Unknown provider: ${provider}`);
    }

    const authedUser = await Users.getAuthenticatedUser(user);

    await Database.collection("users").updateOne(
      { _id: user._id },
      { $set: { [field]: providerId } },
    );

    await Users.loginUser(req, user);

    res.json({ user: authedUser, action: "authenticated" });
  },
});
