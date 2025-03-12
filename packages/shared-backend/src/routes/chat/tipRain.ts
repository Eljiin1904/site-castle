import { Validation } from "@core/services/validation";
import { Intimal } from "@core/services/intimal";
import { Database } from "@server/services/database";
import { Transactions } from "@server/services/transactions";
import { HandledError } from "@server/services/errors";
import { Chat } from "@server/services/chat";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/tip-rain",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    rainId: Validation.string().required("Rain ID is required."),
    tipAmount: Validation.currency("Tip amount"),
  }),
  callback: async (req, res) => {
    const { rainId, tipAmount } = req.body;
    const user = req.user;

    await Site.validateConfirmed(user);

    if (user.tags.includes("cheeky") && user.tags.includes("sponsored")) {
      throw new HandledError(" You are not allowed to tip the rain.");
    }

    await Site.validateSuspension(user);
    await Site.validateTokenBalance(user, tipAmount);

    const rain = await Database.collection("chat-rains").findOne({
      _id: rainId,
    });

    if (!rain) {
      throw new HandledError("Invalid rain id.");
    }
    if (rain.endDate.getTime() - Date.now() < 1000) {
      throw new HandledError("Rain is ending, please wait for the next.");
    }

    await Transactions.createTransaction({
      user,
      autoComplete: true,
      kind: "rain-tip",
      amount: -tipAmount,
      rainId: rain._id,
    });

    if (Intimal.toDecimal(tipAmount) >= 5) {
      await Chat.createMessage({
        kind: "rain-tip",
        channel: null,
        agent: "system",
        user: Users.getBasicUser(user),
        tipAmount,
      });
    }

    res.json({});
  },
});
