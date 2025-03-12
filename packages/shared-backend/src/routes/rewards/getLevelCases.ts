import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-level-cases",
  secure: false,
  callback: async (req, res) => {
    const chests = await Database.collection("chests")
      .find(
        {
          kind: "level-case",
          disabled: false,
        },
        {
          sort: { openCost: 1 },
          projection: {
            slug: 1,
            displayName: 1,
            imageId: 1,
          },
        },
      )
      .toArray();

    res.json({ chests });
  },
});
