import { Validation } from "@core/services/validation";
import { SumsubApplicantDataDocument } from "@core/types/verification/SumsubApplicantDataDocument";
import { Verification } from "@server/services/verification";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-sumsub-applicant-data",
  body: Validation.object({
    userId: Validation.string().required("User ID is required."),
  }),
  supportAccess: true,
  callback: async (req, res, next) => {
    const { userId } = req.body;

    const applicantData: SumsubApplicantDataDocument =
      await Verification.getSumsubApplicantData(userId);

    res.json({ applicantData });
  },
});
