import bcrypt from "bcrypt";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "reset-password",
  points: 5,
  durationSeconds: 15 * 60,
  errorMessage: "Too many password reset requests.",
});

export default Http.createApiRoute({
  type: "post",
  path: "/reset-password",
  restricted: true,
  secure: false,
  body: Validation.object({
    newPassword: Validation.password("New password"),
    recoverToken: Validation.token(),
  }),
  callback: async (req, res) => {
    const { newPassword, recoverToken } = req.body;

    await rateLimiter.consume(req.trueIP, 1);

    const { userId } = await Security.consumeToken({
      kind: "password-recover",
      token: recoverToken,
    });

    const user = (await Database.collection("users").findOne({ _id: userId }))!;

    const passwordHash = await bcrypt.hash(newPassword, 8);

    await Database.collection("users").updateOne(
      { _id: userId },
      {
        $set: {
          passwordSet: true,
          passwordHash,
        },
      },
    );

    await Users.clearSessions(user);

    await Users.loginUser(req, user);

    await Users.trackAction({
      user,
      kind: "password-recover",
      ip: req.trueIP,
    });

    res.json({ user: Users.getAuthenticatedUser(user) });
  },
});
