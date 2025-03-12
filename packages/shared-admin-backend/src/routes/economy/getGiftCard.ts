import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-gift-card",
  body: Validation.object({
    cardId: Validation.string().required("Card ID is required."),
  }),
  callback: async (req, res) => {
    const { cardId } = req.body;

    const card = await Database.collection("gift-cards").findOne({
      _id: cardId,
    });

    res.json({ card });
  },
});
