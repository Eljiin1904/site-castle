import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Transactions } from "@server/services/transactions";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "reward-claim",
  points: 1,
  durationSeconds: 2,
  errorMessage: "You are trying to claim too often.",
});

export default Http.createApiRoute({
  type: "post",
  path: "/claim",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    claimId: Validation.string().required("Claim ID is required."),
  }),
  callback: async (req, res) => {
    const { claimId } = req.body;
    const user = req.user;

    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);

    await rateLimiter.consume(req.user._id, 1);

    const claim = await Database.collection("reward-claims").findOneAndUpdate(
      {
        _id: claimId,
        userId: user._id,
        claimed: { $exists: false },
      },
      {
        $set: {
          claimed: true,
          claimDate: new Date(),
        },
      },
    );

    if (!claim) {
      throw new HandledError("Invalid claim id.");
    }

    await Transactions.createTransaction({
      kind: "reward-claim",
      amount: claim.tokenAmount,
      user,
      autoComplete: true,
      claimId,
      claimKind: claim.kind,
    });

    res.json({ amount: claim.tokenAmount });
  },
});
