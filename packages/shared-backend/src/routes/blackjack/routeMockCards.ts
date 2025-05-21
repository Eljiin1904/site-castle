import { Validation } from "@core/services/validation";
import { Http } from "#app/services/http";
import config from "#app/config";
import { mockCardAbbrev } from "@server/services/blackjack/Blackjack";

export default Http.createApiRoute({
  type: "post",
  path: "/mock-cards",
  restricted: true,
  secure: true,
  transaction: false,
  bet: false,
  body: Validation.object({
    cardAbbrevAr: Validation.array().of(Validation.string().required()).required(),
  }),
  callback: async (req, res, next) => {
    if (!["development", "staging"].includes(config.env))
      throw new Error("this route is not available in this environment");

    const user = req.user;
    const userId = user._id;
    const { cardAbbrevAr } = req.body;

    if (cardAbbrevAr.length == 0) {
      throw new Error("cardAbbrevAr must have at least one element");
    }

    mockCardAbbrev(userId, cardAbbrevAr, true);

    res.json({ success: true });
  },
});
