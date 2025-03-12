import { Http } from "#app/services/http";
import { HandledError } from "@server/services/errors";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";

export default Http.createApiRoute({
  type: "post",
  path: "/get-user",
  body: Validation.object({
    userId: Validation.string().required("User ID is required."),
  }),
  callback: async (req, res) => {
    const { userId } = req.body;

    const user = await Database.collection("users").findOne({ _id: userId });

    if (!user) {
      throw new HandledError("User not found.");
    }

    res.json({ user });
  },
});
