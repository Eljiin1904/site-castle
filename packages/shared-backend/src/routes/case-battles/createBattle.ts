import { Validation } from "@core/services/validation";
import { Intimal } from "@core/services/intimal";
import { Database } from "@server/services/database";
import { CaseBattles } from "@server/services/case-battles";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/create-battle",
  restricted: true,
  secure: true,
  transaction: true,
  bet: true,
  body: Validation.object({
    mode: Validation.string().oneOf(CaseBattles.modes, "Invalid mode.").required("Mode required."),
    chests: Validation.array()
      .of(
        Validation.object({
          id: Validation.string().required(),
          count: Validation.number().integer().min(1).max(CaseBattles.maxRounds).required(),
        }),
      )
      .min(1)
      .required("Cases are required."),
    modifiers: Validation.array()
      .of(Validation.string().oneOf(CaseBattles.modifiers, "Invalid modifiers.").required())
      .required("Modifiers are required."),
  }),
  callback: async (req, res) => {
    const { mode, chests: chestInfo, modifiers } = req.body;
    const user = req.user;

    await Site.validateToggle("caseBattlesEnabled");
    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);

    const totalRounds = chestInfo.reduce((acc, x) => (acc += x.count), 0);

    if (totalRounds > CaseBattles.maxRounds) {
      throw new HandledError(`Max rounds is ${CaseBattles.maxRounds}.`);
    }

    if (modifiers.length > CaseBattles.modifiers.length) {
      throw new HandledError("Excessive modifiers.");
    }
    if (modifiers.some((x, i) => modifiers.lastIndexOf(x) !== i)) {
      throw new HandledError("Duplicate modifiers.");
    }
    if (modifiers.some((x, i) => !CaseBattles.getModifierInfo(x).modes.includes(mode))) {
      throw new HandledError("Unsupported modifiers.");
    }

    modifiers.sort((a, b) => CaseBattles.modifiers.indexOf(a) - CaseBattles.modifiers.indexOf(b));

    const activeBattles = await Database.collection("case-battles").countDocuments({
      players: { $elemMatch: { id: user._id } },
      status: { $ne: "completed" },
    });

    if (activeBattles >= CaseBattles.maxBattles) {
      throw new HandledError(`You can only join ${CaseBattles.maxBattles} battles at once.`);
    }

    const unsorted = await Database.collection("chests")
      .find(
        {
          _id: { $in: chestInfo.map((x) => x.id) },
          kind: "case",
          disabled: false,
        },
        {
          projection: {
            kind: 0,
            createDate: 0,
            editDate: 0,
            disabled: 0,
            popularity: 0,
          },
        },
      )
      .toArray();

    if (unsorted.length !== chestInfo.length) {
      throw new HandledError("Invalid cases.");
    }

    const chests = [];

    for (const info of chestInfo) {
      const chest = unsorted.find((x) => x._id === info.id);

      if (!chest) {
        throw new HandledError("Case lookup failed.");
      }

      chests.push({
        ...chest,
        count: info.count,
      });
    }

    const totalCost = chests.reduce((acc, x) => (acc += x.openCost * x.count), 0);

    if (totalCost > Intimal.fromDecimal(1e5)) {
      throw new HandledError("Max cost is 100,000 tokens.");
    }

    await Site.validateTokenBalance(user, totalCost);

    const location = await Http.getLocation(req.trueIP);

    const { _id: battleId } = await CaseBattles.createBattle({
      user,
      location,
      mode,
      chests,
      modifiers,
    });

    res.json({ battleId });
  },
});
