import { startOfHour } from "date-fns";
import { Validation } from "@core/services/validation";
import { AffiliateReloadDocument } from "@core/types/affiliates/AffiliateReloadDocument";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Admin } from "@server/services/admin";
import { Users } from "@server/services/users";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/create-reload",
  body: Validation.object({
    userLookup: Validation.string().required("User Lookup is required."),
    resetDate: Validation.date().required("Reset date is required."),
    tokenAmount: Validation.currency("Token amount"),
    claimCount: Validation.number().integer().min(1).required("Claim count is required."),
  }),
  callback: async (req, res) => {
    const { userLookup, resetDate, tokenAmount, claimCount } = req.body;
    const admin = req.user;

    const user = await Database.collection("users").findOneAndUpdate(
      {
        $or: [{ _id: userLookup }, { email: userLookup }, { username: userLookup }],
      },
      {
        $set: {
          "meta.reloadsEnabled": true,
        },
      },
      {
        collation: { locale: "en", strength: 2 },
      },
    );

    if (!user) {
      throw new HandledError("User not found.");
    }

    const existingReload = await Database.collection("affiliate-reloads").findOne({
      "user.id": user._id,
    });

    if (existingReload) {
      throw new HandledError("A reload for this user already exists.");
    }

    const reload: AffiliateReloadDocument = {
      _id: Ids.object(),
      createDate: new Date(),
      resetDate: startOfHour(resetDate),
      user: Users.getBasicUser(user),
      tokenAmount,
      claimsAvailable: claimCount,
      claimsStart: claimCount,
    };

    await Database.collection("affiliate-reloads").insertOne(reload);

    await Admin.log({
      kind: "affiliate-reload-create",
      admin: Users.getBasicUser(admin),
      reload,
    });

    res.json({ reload });
  },
});
