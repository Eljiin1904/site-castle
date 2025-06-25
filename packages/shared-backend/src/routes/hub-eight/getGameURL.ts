import { Validation } from "@core/services/validation";
import { Http } from "#app/services/http";
import config from "#app/config";
import { Site } from "#app/services/site";
import axios from "axios";
import { Security } from "@server/services/security";
import { Ids } from "@server/services/ids";
import { addMinutes } from "date-fns";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

const logger = getServerLogger({});

// TODO add Flag for process with Private Key
// The idea will be to display all transaction and allow user to click and get details regarding that transaction
export default Http.createApiRoute({
  type: "post",
  path: "/game/launch",
  secure: true,
  body: Validation.object({
    platform: Validation.string().oneOf(["GPL_DESKTOP", "GPL_MOBILE"]).required(),
    game_code: Validation.string().required("Game code required"),
    product_code: Validation.string().notRequired(),
  }),
  callback: async (req, res) => {
    const { platform, game_code } = req.body;
    const { operatorId, hub88PrivateKey, hubEightApiURL } = config;

    const user = req.user;

    // 1. Check KYC and Suspension status
    // await Site.validateToggle("hubEightEnabled");
    // await Site.validateSuspension(user);
    // await Site.validateKycTier(user, Validation.kycTiers.email);

    const payload = {
      operator_id: Number(operatorId),
    };
    // 2. Generate signature with Private Key
    const hubEightSignature = Security.sign(
      hub88PrivateKey.replace(/\\n/g, "\n"),
      JSON.stringify(payload),
    );

    // 3. Generate Token with User details
    const token = await Security.createToken({
      kind: "hub-eight-token",
      token: Ids.long(),
      expires: addMinutes(Date.now(), 60),
      userDetails: {
        id: user._id,
        username: user.username,
        tokenBalance: user.tokenBalance,
      },
      gameCode: game_code,
    });

    // 4. Construct Request Data
    const requestData = {
      user: user.username,
      token: token,
      sub_partner_id: "castle", // Confirm that we do not have a sub partner
      platform,
      operator_id: Number(operatorId),
      meta: {},
      lobby_url: `${config.siteAPI}/external`, // URL of Frontend home integration Page
      lang: "en", // -> Language
      ip: req.trueIP, // IP
      game_code: game_code, // Game Code
      deposit_url: `${config.siteAPI}`, // A place where user can deposit funds
      currency: "USD", // Confirmed that 1 Token == 1 USD
      game_currency: "USD", // Confirm that this will also be USD
      country: user.kyc.country?.code,
    };

    // 4. Make request to -> /operator/generic/v2/game/url with operator ID from config
    // Return Game URL
    try {
      const result = await axios.post(
        `${hubEightApiURL}/operator/generic/v2/game/url`,
        requestData,
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
      return;
    } catch (err: any) {
      logger.error(err);
    }
  },
});
