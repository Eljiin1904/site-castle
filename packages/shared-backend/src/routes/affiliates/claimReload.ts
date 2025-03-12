import { isFuture } from "date-fns";
import { Validation } from "@core/services/validation";
import { Affiliates } from "@server/services/affiliates";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/claim-reload",
  secure: true,
  restricted: true,
  transaction: true,
  body: Validation.object({
    reloadId: Validation.string().required("Reload ID is required"),
  }),
  callback: async (req, res) => {
    const { reloadId } = req.body;
    const user = req.user;

    const reload = await Database.collection("affiliate-reloads").findOne({
      _id: reloadId,
      "user.id": user._id,
    });

    if (!reload) {
      throw new HandledError("Reload not found.");
    }

    if (reload.claimsAvailable === 0) {
      throw new HandledError("Reload has no claims available.");
    }

    if (isFuture(reload.resetDate)) {
      throw new HandledError("Reload already claimed today.");
    }

    const location = await Http.getLocation(req.trueIP);

    await Affiliates.claimReload({
      user,
      reload,
      location,
    });

    res.json({});
  },
});
