import { SumsubReviewResult } from "@core/types/verification/SumsubApplicantDataDocument";
import { HandledError } from "@server/services/errors";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { Notifications } from "@server/services/notifications";

// https://docs.sumsub.com/docs/receive-and-interpret-results-via-api
// https://docs.sumsub.com/docs/user-verification-webhooks

const reviewStatus = [
  "init",
  "pending",
  "prechecked",
  "queued",
  "completed",
  "onHold",
] as const;

interface SumsubUserVerificationWebhook {
  applicantId: string;
  inspectionId: string;
  applicantType: string;
  correlationId: string;
  levelName: string;
  sandboxMode: boolean;
  externalUserId: string;
  type: "applicantReviewed";
  reviewStatus: (typeof reviewStatus)[number];
  createdAt: Date;
  createdAtMs: Date;
  reviewResult: SumsubReviewResult;
  clientId: string;
}

export default Http.createRoute({
  type: "post",
  path: "/validate",
  callback: async (req, res, next) => {
    res.json({});

    const body: SumsubUserVerificationWebhook = req.body;

    const { type, externalUserId } = body;
    const user = await Database.collection("users").findOne({
      _id: externalUserId,
    });

    if (!user) {
      throw new HandledError(`Unknown userId, ${externalUserId}.`);
    }

    if (type === "applicantReviewed") {
      const { reviewResult } = body;
      const verified = reviewResult.reviewAnswer === "GREEN";

      await Database.collection("users").updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            "kyc.tier": 3,
            "kyc.sumsubReviewAnswer": reviewResult.reviewAnswer,
          },
        },
      );

      await Notifications.createNotification({
        userId: user._id,
        kind: "sumsub-review-result",
        verified,
      });
    } else {
      // Discard any other message types
      // throw new HandledError("Sumsub message not parsed.");
    }
  },
});
