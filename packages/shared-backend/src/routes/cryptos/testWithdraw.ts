import { Http } from "#app/services/http";
import { Validation } from "@core/services/validation";
import { LaunchDarklyService } from "@server/services/launch-darkly/LaunchDarklyService";

export default Http.createApiRoute({
  type: "post",
  path: "/test-withdraw",
  secure: false,
  body: Validation.object({
    id: Validation.string().required("Id is required."),
  }),
  callback: async (req, res) => {
    const { id } = req.body;
    const ans = await LaunchDarklyService.isFeatureEnabled(id, "Transaction-Flag");
    res.json({ enabled: ans });
  },
});
