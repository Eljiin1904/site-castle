import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { hubStatus } from "@core/services/hub-eight/HubEight";
import config from "@server/config";
import { Security } from "@server/services/security";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { validateSignature } from "./utils/validateSignature";

const logger = getServerLogger({});

export default Http.createApiRoute({
  type: "post",
  path: "/user/info",
  secure: false,
  signatureRequired: true,
  body: Validation.object({
    user: Validation.username().required("User is required."),
    request_uuid: Validation.string().required("Request UUID required"),
  }),
  callback: async (req, res) => {
    const { hubEightPublicKey } = config;
    const { user, request_uuid } = req.body;
    const options: any = {};
    options.username = user;

    logger.info(`User info Payload Received from Hubb88:  ${JSON.stringify(req.body)} `);

    // 1. Validate Signature Header
    if (!validateSignature(req, "x-hub88-signature", hubEightPublicKey)) {
      res.status(200).json({
        status: "RS_ERROR_INVALID_SIGNATURE",
        request_uuid,
      });
      return;
    }

    logger.info(`Signature Verified in User Info `);

    // const retreivedSignature = req.headers["x-hub88-signature"] as string;

    // if (!retreivedSignature) {
    //   logger.error(`Signature not provided for Request Id ${request_uuid}`);

    //   res.status(200).json({
    //     status: "RS_ERROR_INVALID_SIGNATURE",
    //     request_uuid: request_uuid,
    //   });
    //   return;
    // }
    // const originalMessage = JSON.stringify(req.body);
    // const isValid = Security.verify(hubEightPublicKey, originalMessage, retreivedSignature);
    // if (!isValid) {
    //   logger.error(`Invalid Signature provided for Request Id ${request_uuid}`);
    //   res.status(200).json({
    //     status: "RS_ERROR_INVALID_SIGNATURE",
    //     request_uuid: request_uuid,
    //   });
    //   return;
    // }

    // 2. Validate Token
    const userInfo = await Database.collection("users").findOne(options);
    if (!userInfo) throw new Error("RS_ERROR_INVALID_PARTNER");

    let registrationDate = userInfo?.registerDate;
    let formattedDate;

    if (registrationDate) {
      const date = new Date(registrationDate);
      // Format to YYYY-MM-DD
      formattedDate = date.toISOString().split("T")[0];
    }

    const formattedDob =
      userInfo?.kyc.dob?.year && userInfo?.kyc.dob?.month && userInfo?.kyc.dob?.day
        ? `${userInfo?.kyc.dob?.year}-${String(userInfo?.kyc.dob?.month).padStart(2, "0")}-${String(userInfo?.kyc.dob?.day).padStart(2, "0")}`
        : "";

    // 3. Return User Balance
    res.json({
      user: userInfo?.username,
      status: hubStatus.RS_OK,
      request_uuid: request_uuid,
      country: "EE", // Make sure proper Country code sent
      jurisdiction: "MGA", // What?
      sub_partner_id: "castle", // What?
      birth_date: formattedDob, // Make sure values present, proper kyc tier
      registration_date: formattedDate,
      tags: userInfo.tags,
      sex: "MALE", // We do not currently accept this,
      affiliate_id: userInfo.referral?.campaignId ?? "",
    });
  },
});
