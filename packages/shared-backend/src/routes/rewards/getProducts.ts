import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-products",
  secure: false,
  callback: async (req, res) => {
    const products = await Database.collection("reward-products")
      .find(
        {
          disabled: false,
        },
        {
          sort: {
            featured: -1,
            kind: 1,
            gemCost: 1,
          },
        },
      )
      .toArray();

    res.json({ products });
  },
});
