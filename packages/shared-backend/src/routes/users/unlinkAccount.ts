import { Database } from "@server/services/database";
import { Validation } from "@core/services/validation";
import { UserDocument } from "@core/types/users/UserDocument";
import { DotNestedKeys } from "@core/types/utility/DotNestedKeys";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/unlink-account",
  secure: true,
  body: Validation.object({
    password: Validation.password(),
    provider: Validation.string()
      .oneOf(Users.linkProviders, "Invalid provider.")
      .required("Provider is required."),
  }),
  callback: async (req, res) => {
    const { password, provider } = req.body;
    const user = req.user;

    await Site.validatePassword(user, password);

    let field: DotNestedKeys<UserDocument>;

    if (provider === "discord") {
      field = "discordId";
    } else if (provider === "google") {
      field = "googleId";
    } else if (provider === "steam") {
      field = "steamId";
    } else if (provider === "twitch") {
      field = "twitchId";
    } else {
      throw new HandledError(`Unknown provider: ${provider}`);
    }

    await Database.collection("users").updateOne({ _id: user._id }, { $set: { [field]: null } });

    res.json({});
  },
});
