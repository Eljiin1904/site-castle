import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { CustomerIO } from "@server/services/customer-io";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/edit-email",
  secure: true,
  captcha: true,
  body: Validation.object({
    password: Validation.password(),
    email: Validation.email(),
  }),
  callback: async (req, res) => {
    const { password, email } = req.body;
    const user = req.user;

    await Site.validatePassword(user, password);

    if (await Database.exists("users", { email }, { collation: { locale: "en", strength: 2 } })) {
      throw new HandledError("errors.email.taken");
    }

    await Site.validateEmail(email);

    await Database.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          email,
          emailConfirmed: false,
        },
      },
    );

    await Users.trackAction({
      user,
      kind: "email-edit",
      ip: req.trueIP,
      oldEmail: user.email,
      newEmail: email,
    });

    await CustomerIO.updateUser(user._id, { email_verified: false });

    res.json({});
  },
});
