import { subDays } from "date-fns";
import { Validation } from "@core/services/validation";
import { Affiliates } from "@server/services/affiliates";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-stats",
  secure: true,
  body: Validation.object({
    timeIndex: Validation.index("Time index", 3),
  }),
  callback: async (req, res) => {
    const { timeIndex } = req.body;
    const user = req.user;

    const minDate = [
      subDays(Date.now(), 1),
      subDays(Date.now(), 7),
      subDays(Date.now(), 30),
      new Date(0),
    ][timeIndex];

    const maxDate = new Date();

    const stats = await Affiliates.aggregateStats({
      affiliateId: user._id,
      minDate,
      maxDate,
    });

    res.json({ stats });
  },
});
