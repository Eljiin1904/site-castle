import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { hubStatus } from "@core/services/hub-eight/HubEight";
import { Security } from "@server/services/security";
import config from "@server/config";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { validateSignature } from "./utils/validateSignature";

const logger = getServerLogger({});

export default Http.createApiRoute({
  type: "post",
  path: "/user/balance",
  secure: false,
  signatureRequired: true,
  body: Validation.object({
    user: Validation.username().required("User is required."),
    token: Validation.string().required("Token required"),
    request_uuid: Validation.string().uuid().required("Request UUID required"),
    game_code: Validation.string().required("Game Code required"),
  }),
  callback: async (req, res) => {
    const { user, request_uuid, game_code, token } = req.body;
    const { hubEightPublicKey } = config;
    const options: any = {};

    logger.info(`Get User Balance for Hubb88: ${JSON.stringify(req.body)} `);

    // 1. Validate Signature Header
    if (!validateSignature(req, "x-hub88-signature", hubEightPublicKey)) {
      res.status(200).json({
        status: "RS_ERROR_INVALID_SIGNATURE",
        request_uuid,
      });
      return;
    }

    logger.info(`Signature Verified in Balance `);

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
    const { userDetails } = await Security.getToken({ kind: "hub-eight-token", token });
    if (!userDetails) {
      res.status(200).json({ status: "RS_ERROR_INVALID_TOKEN", request_uuid: request_uuid });
      return;
    }
    options.username = userDetails.username;

    // 3. Validate User Exist
    const userInfo = await Database.collection("users").findOne(options);
    if (!userInfo) throw new Error("RS_ERROR_INVALID_PARTNER");

    // 4. Return User Balance
    res.json({
      user: userInfo?.username,
      status: hubStatus.RS_OK,
      request_uuid: request_uuid,
      currency: "USD", // Confirmed that 1 Token == 1 USD
      balance: userInfo.tokenBalance, // Confirm that this will also be USD
    });
  },
});
