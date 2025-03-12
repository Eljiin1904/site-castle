import { startOfHour } from "date-fns";
import { Users } from "@core/services/users";
import { Validation } from "@core/services/validation";
import { Admin } from "@server/services/admin";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/edit-reload",
  body: Validation.object({
    reloadId: Validation.string().required("Reload ID is required."),
    resetDate: Validation.date().required("Reset date is required."),
    tokenAmount: Validation.currency("Token amount"),
    claimCount: Validation.number().integer().min(0).required("Claim count is required."),
  }),
  callback: async (req, res) => {
    const { reloadId, tokenAmount, claimCount } = req.body;
    const admin = req.user;

    const reload = await Database.collection("affiliate-reloads").findOne({
      _id: reloadId,
    });

    if (!reload) {
      throw new HandledError("Reload not found.");
    }

    let resetDate = reload.resetDate;
    resetDate.setHours(req.body.resetDate.getHours());
    resetDate = startOfHour(resetDate);

    await Database.collection("affiliate-reloads").updateOne(
      {
        _id: reloadId,
      },
      {
        $set: {
          resetDate,
          tokenAmount,
          ...(reload.claimsAvailable !== claimCount
            ? {
                claimsAvailable: claimCount,
                claimsStart: claimCount,
              }
            : undefined),
        },
      },
    );

    await Admin.log({
      kind: "affiliate-reload-edit",
      admin: Users.getBasicUser(admin),
      reload,
    });

    res.json({ reload });
  },
});
