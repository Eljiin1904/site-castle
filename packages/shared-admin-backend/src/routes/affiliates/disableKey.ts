import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Users } from "@server/services/users";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/disable-key",
  body: Validation.object({
    keyId: Validation.string().required("Key ID is required."),
  }),
  callback: async (req, res) => {
    const { keyId } = req.body;
    const admin = req.user;

    await Database.collection("affiliate-keys").updateOne(
      { _id: keyId },
      {
        $set: {
          enabled: false,
        },
      },
    );

    await Admin.log({
      kind: "affiliate-key-disable",
      admin: Users.getBasicUser(admin),
      keyId,
    });

    res.json({});
  },
});
