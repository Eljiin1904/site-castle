import { Validation } from "@core/services/validation";
import { AffiliateKeyDocument } from "@core/types/affiliates/AffiliateKeyDocument";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Admin } from "@server/services/admin";
import { Users } from "@server/services/users";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/create-key",
  body: Validation.object({
    affiliateId: Validation.string().required("Affiliate ID is required."),
  }),
  callback: async (req, res) => {
    const { affiliateId } = req.body;
    const admin = req.user;

    const key: AffiliateKeyDocument = {
      _id: Ids.object(),
      timestamp: new Date(),
      key: Ids.secret(),
      affiliateId,
      enabled: true,
    };

    await Database.collection("affiliate-keys").insertOne(key);

    await Admin.log({
      kind: "affiliate-key-create",
      admin: Users.getBasicUser(admin),
      keyId: key._id,
    });

    res.json({ key });
  },
});
