import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-reload",
  secure: true,
  restricted: true,
  callback: async (req, res) => {
    const { user } = req;

    const reload = await Database.collection("affiliate-reloads").findOne({
      "user.id": user._id,
    });

    res.json({ reload });
  },
});
