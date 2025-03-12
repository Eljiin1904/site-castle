import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-level-case",
  secure: false,
  body: Validation.object({
    slug: Validation.string().required("Slug is required."),
  }),
  callback: async (req, res) => {
    const { slug } = req.body;

    const chest = await Database.collection("chests").findOne({
      kind: "level-case",
      slug,
    });

    if (!chest) {
      throw new HandledError("Case not found.");
    }
    if (chest.disabled) {
      throw new HandledError("Case is disabled.");
    }

    res.json({ chest });
  },
});
