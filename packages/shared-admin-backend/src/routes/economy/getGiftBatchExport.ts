import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-gift-batch-export",
  body: Validation.object({
    batchId: Validation.string().required("Batch ID is required."),
  }),
  callback: async (req, res) => {
    const { batchId } = req.body;

    const cards = await Database.collection("gift-cards")
      .find({ batchId }, { projection: { _id: 1 } })
      .toArray();

    const text = cards.map((x) => x._id).join("\n");

    res.json({ text });
  },
});
