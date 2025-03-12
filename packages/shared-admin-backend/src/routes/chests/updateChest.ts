import sharp from "sharp";
import { Strings } from "@core/services/strings";
import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";
import { Database } from "@server/services/database";
import { Cloud } from "@server/services/cloud";
import { Admin } from "@server/services/admin";
import { Chests } from "@server/services/chests";
import { Ids } from "@server/services/ids";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/update-chest",
  file: "image",
  body: Validation.object({
    chestId: Validation.string().required("Chest ID is required."),
    displayName: Validation.string().required("Display name is required."),
    kind: Validation.string().oneOf(Chests.kinds).required("Kind is required."),
    items: Validation.array()
      .json()
      .of(
        Validation.object({
          announce: Validation.boolean().required(),
          jackpot: Validation.boolean().required(),
          special: Validation.boolean().required(),
        }),
      )
      .required(),
  }),
  callback: async (req, res) => {
    const { chestId, displayName, kind, items } = req.body;
    const slug = Strings.toSlug(displayName);
    const admin = req.user;

    const setter: Record<string, any> = {
      displayName,
      slug,
      kind,
    };

    if (req.file) {
      const imageId = Ids.object();

      const image = await sharp(req.file.buffer)
        .resize(256, 256)
        .png({
          compressionLevel: 6,
          quality: 100,
        })
        .toBuffer();

      await Cloud.uploadObject({
        key: `chests/${imageId}.png`,
        body: image,
        contentType: "image/png",
      });

      setter.imageId = imageId;
    }

    for (let i = 0; i < items.length; i++) {
      setter[`items.${i}.announce`] = items[i].announce;
      setter[`items.${i}.jackpot`] = items[i].jackpot;
      setter[`items.${i}.special`] = items[i].special;
    }

    const chest = await Database.collection("chests").findOneAndUpdate(
      { _id: chestId },
      { $set: setter },
    );

    if (!chest) {
      throw new HandledError("Chest not found.");
    }

    await Admin.log({
      kind: "chest-update",
      admin: Users.getBasicUser(admin),
      chest: Chests.getBasicChest(chest),
    });

    res.json({});
  },
});
