import sharp from "sharp";
import { Intimal } from "@core/services/intimal";
import { Items } from "@core/services/items";
import { Validation } from "@core/services/validation";
import { Strings } from "@core/services/strings";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { ChestItem, ChestItemOptions } from "@core/types/chests/ChestItem";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";
import { Ids } from "@server/services/ids";
import { Admin } from "@server/services/admin";
import { Cloud } from "@server/services/cloud";
import { Chests } from "@server/services/chests";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/create-chest",
  file: "image",
  body: Validation.object({
    displayName: Validation.string().required("Display name is required."),
    kind: Validation.string().oneOf(Chests.kinds).required("Kind is required."),
    items: Validation.array()
      .json()
      .of(
        Validation.object({
          id: Validation.string().required(),
          dropRate: Validation.number().integer().required(),
          announce: Validation.boolean().required(),
          jackpot: Validation.boolean().required(),
          special: Validation.boolean().required(),
        }),
      )
      .required(),
  }),
  callback: async (req, res) => {
    const { displayName, kind } = req.body;
    const slug = Strings.toSlug(displayName);
    const admin = req.user;

    if (!req.file) {
      throw new HandledError("Image is required.");
    }

    const items = await buildItems(req.body.items);

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

    const chestId = Ids.short();
    const openCost = Intimal.ceil(Chests.getValue(items).openCost);

    const chest: ChestDocument = {
      _id: chestId,
      kind,
      slug,
      imageId,
      displayName,
      items,
      openCost,
      createDate: new Date(),
      editDate: new Date(),
      disabled: true,
    };

    await Database.collection("chests").insertOne(chest);

    await Database.collection("items").bulkWrite(
      items.map((x) => ({
        updateOne: {
          filter: { _id: x.id },
          update: { $inc: { "loot.count": 1 } },
        },
      })),
    );

    await Admin.log({
      kind: "chest-create",
      admin: Users.getBasicUser(admin),
      chest: Chests.getBasicChest(chest),
    });

    res.json({ chestId });
  },
});

async function buildItems(options: ChestItemOptions[]) {
  const documents = await Database.collection("items")
    .find({ _id: { $in: options.map((x) => x.id) } })
    .toArray();

  const items = [];

  for (const info of options) {
    const document = documents.find((x) => x._id === info.id);

    if (!document) {
      throw new HandledError(`Invalid items, failed lookup on ${info.id}`);
    }

    const item: ChestItem = {
      ...Items.getLoot(document),
      ...info,
    };

    items.push(item);
  }

  return items;
}
