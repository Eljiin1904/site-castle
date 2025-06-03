import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { CaseBattles } from "@server/services/case-battles";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/join-battle",
  restricted: true,
  secure: true,
  transaction: true,
  bet: true,
  body: Validation.object({
    battleId: Validation.string().required("Battle ID is required."),
    seat: Validation.number().min(1).max(3).required("Seat is required."),
    joinKey: Validation.string(),
  }),
  callback: async (req, res, next) => {
    const { battleId, seat, joinKey } = req.body;
    const user = req.user;

    await Site.validateSuspension(user);
    await Site.validateKycTier(user, Validation.kycTiers.personalInfo);

    const activeBattles = await Database.collection("case-battles").countDocuments({
      players: { $elemMatch: { id: user._id } },
      status: { $ne: "completed" },
    });

    if (activeBattles >= CaseBattles.maxBattles) {
      throw new HandledError(`You can only join ${CaseBattles.maxBattles} battles at once.`);
    }

    const battle = await Database.collection("case-battles").findOne({
      _id: battleId,
      status: "waiting",
    });

    if (!battle) {
      throw new HandledError("Invalid battle.");
    }
    if (seat >= battle.players.length) {
      throw new HandledError("Invalid seat.");
    }
    if (CaseBattles.includesUser(battle, user._id)) {
      throw new HandledError("You are already in that battle.");
    }

    await Site.validateTokenBalance(user, battle.entryCost);

    const location = await Http.getLocation(req.trueIP);

    const modifiers = battle.modifiers;

    const privateBattle = modifiers.includes("private");
    const friendsOnly = modifiers.includes("friends-only");

    if ((privateBattle || friendsOnly) && joinKey !== battle.joinKey) {
      throw new HandledError("This battle requires an invitation to join.");
    }

    await CaseBattles.joinBattle({
      user,
      location,
      battle,
      seat,
    });

    res.json({});
  },
});
