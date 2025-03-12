import { Database } from "@server/services/database";
import { Validation } from "@core/services/validation";
import { CustomerIO } from "@server/services/customer-io";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/confirm-email",
  restricted: true,
  secure: false,
  body: Validation.object({
    confirmToken: Validation.token(),
  }),
  callback: async (req, res) => {
    const { confirmToken } = req.body;

    const { userId, email } = await Security.consumeToken({
      kind: "email-confirm",
      token: confirmToken,
    });

    await Database.collection("users").updateOne(
      {
        _id: userId,
        email,
      },
      { $set: { emailConfirmed: true } },
    );

    await CustomerIO.updateUser(userId, { email_verified: true });

    res.json({});
  },
});
