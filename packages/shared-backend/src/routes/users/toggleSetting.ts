import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/toggle-setting",
  restricted: true,
  secure: true,
  body: Validation.object({
    id: Validation.string()
      .oneOf(Users.settingGeneralKeys, "Invalid ID.")
      .required("ID is required."),
    value: Validation.boolean().required("Value is required."),
  }),
  callback: async (req, res) => {
    const { id, value } = req.body;
    const user = req.user;

    await Database.collection("users").updateOne(
      { _id: user._id },
      { $set: { [`settings.${id}`]: value } },
    );

    res.json({});
  },
});
