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

export default Http.createApiRoute({
  type: "post",
  path: "/game/launch",
  secure: false,
  body: Validation.object({
    platform: Validation.string().oneOf(["GPL_DESKTOP", "GPL_MOBILE"]).required(),
    game_code: Validation.string().required("Game code required"),
    demo: Validation.boolean().required("Demo field is required"),
    product_code: Validation.string().notRequired(),
  }),

  callback: async (req, res) => {
    const { platform, game_code, demo } = req.body;
    const { operatorId, hub88PrivateKey, hubEightApiURL } = config;

    const user = req.user;
    const isDemo = !user || demo; // Checks if user didnt pass authentication or if the flag is set to demo

    // 1. Check KYC and Suspension status, if User is authenticated
    // IF user is not authenticated, still have to check if game is enabled

    // TODO -> Check if game enabled
    // TODO -> Check if the game category is enabled
    // await Site.validateToggle("hubEightEnabled");
    // await Site.validateConfirmed(user);
    // await Site.validateSuspension(user);
    // await Site.validateKycTier(user, Validation.kycTiers.email);

    let token;
    if (!isDemo) {
      // 2. Generate Token with User details
      token = await Security.createToken({
        kind: "hub-eight-token",
        token: Ids.long(),
        expires: addMinutes(Date.now(), 180),
        userDetails: {
          id: user._id,
          username: user.username,
          tokenBalance: user.tokenBalance,
        },
        gameCode: game_code,
      });
    }
    // 3. Construct Payload
    const payload = {
      ...(!isDemo && { user: user.username }), // If not authenticated, omit and it will be considered a DEMO
      ...(!isDemo && { token: token }), // If not authenticated, omit and it will be considered a DEMO
      sub_partner_id: "castle", // Confirm that we do not have a sub partner
      platform,
      operator_id: Number(operatorId),
      meta: {},
      lobby_url: `${config.siteAPI}/external`, // URL of Frontend home integration Page
      lang: "en",
      ip: req.trueIP,
      game_code: game_code,
      deposit_url: `${config.siteAPI}`, // A place where user can deposit funds
      currency: "USD", // Confirmed that 1 Token == 1 USD
      game_currency: "USD", // Confirm that this will also be USD
      country: "FR", // Grab from Ip, if not able too throw Error?
    };

    // 4. Generate signature with Private Key
    const hubEightSignature = Security.sign(
      hub88PrivateKey.replace(/\\n/g, "\n"),
      JSON.stringify(payload),
    );

    logger.info(`Sending following Payload for URL -> ${JSON.stringify(payload)}`);

    // 5. Make request to -> /operator/generic/v2/game/url with operator ID from config
    // Return Game URL
    try {
      const result = await axios.post(`${hubEightApiURL}/operator/generic/v2/game/url`, payload, {
        headers: {
          "X-Hub88-Signature": hubEightSignature,
          "Content-Type": "application/json",
        },
      });

      res.json({
        url: result.data.url,
      });
      return;
    } catch (err: any) {
      logger.error(`Issue Processing getting Game Url, Error: ${err}`);
      throw new Error("Unable to process request at this time");
    }
  },
});
