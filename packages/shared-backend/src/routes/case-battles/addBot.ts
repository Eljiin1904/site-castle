import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { CaseBattles } from "@server/services/case-battles";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/add-bot",
  secure: true,
  body: Validation.object({
    battleId: Validation.string().required("Battle ID is required."),
    seat: Validation.number().min(1).max(3).required("Seat is required."),
  }),
  callback: async (req, res) => {
    const { battleId, seat } = req.body;
    const user = req.user;

    const battle = await Database.collection("case-battles").findOne({
      _id: battleId,
      status: "waiting",
    });

    if (!battle) {
      throw new HandledError("Invalid battle.");
    }
    if (battle.players[0]?.id !== user._id) {
      throw new HandledError("You did not create the battle.");
    }
    if (seat >= battle.players.length) {
      throw new HandledError("Invalid seat.");
    }

    await CaseBattles.addBot({ battle, seat });

    res.json({});
  },
});
