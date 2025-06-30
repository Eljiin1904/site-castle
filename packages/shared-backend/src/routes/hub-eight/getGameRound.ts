import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { hubStatus } from "@core/services/hub-eight/HubEight";
import { currency } from "@core/services/validation/Validation";
import axios from "axios";
import config from "@server/config";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Security } from "@server/services/security";

const logger = getServerLogger({});

// The idea will be to display all transaction and allow user to click and get details regarding that transaction
export default Http.createApiRoute({
  type: "post",
  path: "/game/round/details",
  secure: true,
  body: Validation.object({
    transaction_uuid: Validation.string().uuid().nullable().notRequired(),
    round: Validation.string().required("Round required"),
  }),
  callback: async (req, res) => {
    const { operatorId, hub88PrivateKey, hubEightApiURL } = config;
    const { transaction_uuid, round } = req.body;

    // 1. Create Request Body
    const options: any = {};
    options.username = req.user.username;
    options.transaction_uuid = transaction_uuid;
    options.round = round;
    options.operatorId = Number(operatorId);

    // 2. Generate signature with Private Key
    const hubEightSignature = Security.sign(
      hub88PrivateKey.replace(/\\n/g, "\n"),
      JSON.stringify(options),
    );

    // 3. Make external call to Hub8 with signed key from RSA private key
    // Make request to -> /operator/generic/v2/game/round with operator ID from config
    try {
      const result = await axios.post(
        `${hubEightApiURL}/operator/generic/v2/game/round `,
        options,
        {
          headers: {
            "X-Hub88-Signature": hubEightSignature,
            "Content-Type": "application/json",
          },
        },
      );

      res.json({
        user: req.user.username,
        url: result.data.url,
      });
    } catch (err: any) {
      logger.error(`Issue Processing Game Round Details, Error: ${err}`);
      throw new Error("Unable to process request at this time");
    }
  },
});
