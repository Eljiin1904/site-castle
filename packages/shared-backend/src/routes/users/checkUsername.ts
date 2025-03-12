import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/check-username",
  secure: false,
  restricted: true,
  body: Validation.object({
    username: Validation.username(),
  }),
  callback: async (req, res) => {
    const { username } = req.body;

    const exists = await Database.exists(
      "users",
      { username },
      { collation: { locale: "en", strength: 2 } },
    );

    const isAvailable = !exists;

    res.json({ isAvailable });
  },
});
