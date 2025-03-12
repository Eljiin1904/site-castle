import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/toggle-setting",
  restricted: true,
  secure: true,
  body: Validation.object({
    id: Validation.string().oneOf(Users.setting2faKeys, "Invalid ID.").required("ID is required."),
    value: Validation.boolean().required("Value is required."),
    tfac: Validation.tfac(),
  }),
  callback: async (req, res) => {
    const { id, value, tfac } = req.body;
    const user = req.user;

    await Site.validateAuthenticatorCode({ user, tfac });

    await Database.collection("users").updateOne(
      { _id: user._id },
      { $set: { [`settings.${id}`]: value } },
    );

    res.json({});
  },
});
