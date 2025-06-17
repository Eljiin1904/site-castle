import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { hubStatus } from "@core/services/hub-eight/HubEight";
import config from "@server/config";

// TODO add Flag for process with Private Key
export default Http.createApiRoute({
  type: "post",
  path: "/user/info",
  secure: false,
  body: Validation.object({
    user: Validation.username().required("User is required."),
    request_uuid: Validation.string().required("Request UUID required"),
  }),
  callback: async (req, res) => {
    const { hub88PrivateKey } = config;
    const { user, request_uuid } = req.body;
    const options: any = {};
    options.username = user;

    // 1. Validate Signature Header
    // const retreivedSignature = req.headers["X-Hub88-Signature"];
    // if (!retreivedSignature) throw new Error(hubStatus.RS_ERROR_INVALID_SIGNATURE);

    // const data = Security.decrypt(,retreivedSignature)

    // 2. Validate Token
    const userInfo = await Database.collection("users").findOne(options);
    if (!userInfo) throw new Error("RS_ERROR_INVALID_PARTNER");

    // 3. Return User Balance
    res.json({
      user: userInfo?.username,
      status: hubStatus.RS_OK,
      request_uuid: request_uuid,
      country: userInfo?.kyc.country?.code, // Make sure proper Country code sent
      jurisdiction: "MGA", // What?
      sub_partner_id: "castle", // What?
      birth_date: `${userInfo?.kyc.dob?.year}-${userInfo?.kyc.dob?.month}-${userInfo?.kyc.dob?.day}}`, // Make sure values present, proper kyc tier
      registration_date: userInfo?.registerDate,
      tags: userInfo.tags,
      sex: "MALE", // We do not currently accept this,
      affiliate_id: userInfo.referral?.campaignId,
    });
  },
});
