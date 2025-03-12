import { Http } from "#app/services/http";
import { Database } from "@server/services/database";

export default Http.createApiRoute({
  type: "post",
  path: "/get-site-stats",
  secure: false,
  callback: async (req, res) => {
    const stats = await Database.collection("site-stats").findOne({}, { sort: { timestamp: -1 } });

    res.json({ stats });
  },
});
