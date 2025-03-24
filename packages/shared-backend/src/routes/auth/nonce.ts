import { Validation } from "@core/services/validation";
import { Http } from "#app/services/http";
import { randomBytes } from "crypto";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

export default Http.createApiRoute({
  type: "post",
  path: "/nonce",
  restricted: false,
  secure: false,
  transaction: false,
  body: Validation.object({
    address: Validation.commonAddress(),
  }),
  callback: async (req, res) => {
    const logger = getServerLogger({});
    const { address } = req.body;
    const nonceNbr = randomBytes(16).toString("hex");
    logger.info("generated nonce " + nonceNbr + " for address: " + address);

    const nonce = `Sign this nonce to authenticate: ${nonceNbr}`;

    res.json({ nonce });
  },
});
