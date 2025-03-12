import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Users } from "@server/services/users";
import { Chests } from "@server/services/chests";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/disable-chest",
  body: Validation.object({
    chestId: Validation.string().required("Chest ID is required."),
  }),
  callback: async (req, res) => {
    const { chestId } = req.body;
    const admin = req.user;

    const chest = await Database.collection("chests").findOneAndUpdate(
      { _id: chestId },
      { $set: { disabled: true } },
    );

    if (!chest) {
      throw new HandledError("Target chest not found.");
    }

    await Admin.log({
      kind: "chest-disable",
      admin: Users.getBasicUser(admin),
      chest: Chests.getBasicChest(chest),
    });

    res.json({});
  },
});
