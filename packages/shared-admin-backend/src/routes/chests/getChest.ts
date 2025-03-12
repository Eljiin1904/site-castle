import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-chest",
  body: Validation.object({
    chestId: Validation.string().required("Chest ID is required."),
  }),
  callback: async (req, res) => {
    const { chestId } = req.body;

    const chest = await Database.collection("chests").findOne({ _id: chestId });

    res.json({ chest });
  },
});
