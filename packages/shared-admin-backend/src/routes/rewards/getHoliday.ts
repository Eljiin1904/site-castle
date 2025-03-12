import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-holiday",
  body: Validation.object({
    holidayId: Validation.string().required("Holiday ID is required."),
  }),
  callback: async (req, res) => {
    const { holidayId } = req.body;

    const holiday = await Database.collection("holiday-events").findOne({
      _id: holidayId,
    });

    if (!holiday) {
      throw new HandledError("Invalid holiday id.");
    }

    res.json({ holiday });
  },
});
