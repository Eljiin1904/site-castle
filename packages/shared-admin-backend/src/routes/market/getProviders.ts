import { Market } from "@server/services/market";
import { Site } from "@server/services/site";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-providers",
  callback: async (req, res) => {
    const settings = await Site.settings.cache();
    const balances = await Market.getBalances();

    const providers = balances.map((x) => ({
      ...x,
      enabled: settings[`${x.provider}Enabled`],
    }));

    res.json({ providers });
  },
});
