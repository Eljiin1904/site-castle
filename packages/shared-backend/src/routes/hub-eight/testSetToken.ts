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
  path: "/test/token",
  secure: true,
  // body: Validation.object({
  //   platform: Validation.string().oneOf(["GPL_DESKTOP", "GPL_MOBILE"]).required(),
  //   round: Validation.string().required("Round required"),
  //   game_code: Validation.string().required("Round required"),
  // }),
  callback: async (req, res) => {
    const { platform, round, game_code } = req.body;
    const { operatorId, hub88PrivateKey, hubEightApiURL } = config;

    const user = req.user;

    // 1. Generate Token with User details
    const token = await Security.createToken({
      kind: "hub-eight-token",
      token: Ids.long(),
      expires: addMinutes(Date.now(), 60),
      userDetails: {
        id: user._id,
        username: user.username,
        tokenBalance: user.tokenBalance,
      },
      gameCode: "test_game",
    });

    res.json({
      token,
    });
  },
});
