import { Http } from "#app/services/http";
import config from "@server/config";
import { Security } from "@server/services/security";
import axios from "axios";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Ids } from "@server/services/ids";
import { addMinutes } from "date-fns";

const logger = getServerLogger({});

export default Http.createApiRoute({
  type: "get",
  path: "/game/list",
  secure: true,
  callback: async (req, res) => {
    // 1. Get Operator ID and KEy from env
    const { operatorId, hub88PrivateKey, hubEightApiURL } = config;
    const payload = {
      operator_id: operatorId,
    };
    // 2. Generate signature with Private Key
    const hubEightSignature = Security.sign(
      hub88PrivateKey.replace(/\\n/g, "\n"),
      JSON.stringify(payload),
    );
    try {
      // 3. Make external call to Hub8 with signed key from RSA private key
      const result = await axios.post(`${hubEightApiURL}/operator/generic/v2/game/list`, payload, {
        headers: {
          "X-Hub88-Signature": hubEightSignature,
          "Content-Type": "application/json",
        },
      });
      const processedResult = [];
      if (result.data) {
        for (let i = 0; i < result.data.length; i++) {
          let item = result.data[i];
          if (item.enabled) {
            processedResult.push({
              url_thumbnail: item.url_thumb,
              url_background: item.url_background,
              game_code: item.game_code,
              name: item.name,
              release_date: item.release_date,
            });
          }
        }
      }
      // 5. Return list data
      res.json({ data: processedResult });
    } catch (err: any) {
      logger.error(err);
    }
  },
});
