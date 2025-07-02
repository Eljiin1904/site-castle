import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { hubStatus } from "@core/services/hub-eight/HubEight";
import { Security } from "@server/services/security";
import config from "@server/config";

// TODO -> Create a Hub88
export default Http.createApiRoute({
  type: "post",
  path: "/user/balance",
  secure: false,
  body: Validation.object({
    user: Validation.username().required("User is required."),
    token: Validation.string().required("Token required"),
    request_uuid: Validation.string().uuid().required("Request UUID required"),
    game_code: Validation.string().required("Game Code required"),
  }),
  callback: async (req, res) => {
    const { user, request_uuid, game_code, token } = req.body;
    const { hub88PrivateKey } = config;
    const options: any = {};

    // // 1. Validate Signature Header
    // const retreivedSignature = req.headers["X-Hub88-Signature"] as string;
    // if (!retreivedSignature) throw new Error(hubStatus.RS_ERROR_INVALID_SIGNATURE);
    // const resEncodedMessage = new TextEncoder().encode(retreivedSignature);

    // const data = Security.decrypt(hub88PrivateKey, resEncodedMessage);

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
