import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-raffle",
  body: Validation.object({
    raffleId: Validation.string().required("Raffle ID is required."),
  }),
  callback: async (req, res) => {
    const { raffleId } = req.body;

    const raffle = await Database.collection("raffles").findOne({
      _id: raffleId,
    });

    if (!raffle) {
      throw new HandledError("Invalid raffle id.");
    }

    res.json({ raffle });
  },
});
