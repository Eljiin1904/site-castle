import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-keys",
  body: Validation.object({
    affiliateId: Validation.string().required("Affiliate ID is required."),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { affiliateId, limit, page } = req.body;

    const keys = await Database.collection("affiliate-keys")
      .find(
        { affiliateId },
        {
          skip: (page - 1) * limit,
          limit,
        },
      )
      .toArray();

    res.json({ keys });
  },
});
