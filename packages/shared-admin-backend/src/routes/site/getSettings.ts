import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-settings",
  callback: async (req, res) => {
    const settings = await Database.collection("site-settings")
      .find({ system: { $exists: false } })
      .toArray();

    res.json({ settings });
  },
});
