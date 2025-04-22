import { Validation } from "@core/services/validation";
import { SumsubApplicantDataDocument } from "@core/types/verification/SumsubApplicantDataDocument";
import { Verification } from "@server/services/verification";
import { Database } from "@server/services/database";
import { Notifications } from "@server/services/notifications";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/update-sumsub-applicant-data",
  body: Validation.object({
    userId: Validation.string().required("User ID is required."),
  }),
  supportAccess: true,
  callback: async (req, res, next) => {
    const { userId } = req.body;

    const applicantData: SumsubApplicantDataDocument =
      await Verification.getSumsubApplicantData(userId);

    if (applicantData.review?.reviewResult) {
      const { reviewResult } = applicantData.review;
      const verified = reviewResult.reviewAnswer === "GREEN";

      await Database.collection("users").updateOne(
        {
          _id: userId,
        },
        {
          $set: {
            "kyc.tier": 3,
            "kyc.sumsubReviewAnswer": reviewResult.reviewAnswer,
          },
        },
      );

      await Notifications.createNotification({
        userId: userId,
        kind: "sumsub-review-result",
        verified,
      });
    }

    res.json({});
  },
});
