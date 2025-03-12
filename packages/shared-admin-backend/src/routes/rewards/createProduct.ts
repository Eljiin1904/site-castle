import sharp from "sharp";
import { Validation } from "@core/services/validation";
import { RewardProductDocument } from "@core/types/rewards/RewardProductDocument";
import { Strings } from "@core/services/strings";
import { Users } from "@server/services/users";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Admin } from "@server/services/admin";
import { Rewards } from "@server/services/rewards";
import { HandledError } from "@server/services/errors";
import { Chests } from "@server/services/chests";
import { Cloud } from "@server/services/cloud";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/create-product",
  file: "image",
  body: Validation.object({
    kind: Validation.string().oneOf(Rewards.productKinds, "Invalid kind.").required(),
    displayName: Validation.string().required("Display name is required."),
    gemCost: Validation.currency("Gem cost"),
    chestId: Validation.string(),
    tokenAmount: Validation.currency("Token amount").optional(),
  }),
  callback: async (req, res) => {
    const { kind, displayName, gemCost, chestId, tokenAmount } = req.body;
    const slug = Strings.toSlug(displayName);
    const admin = req.user;

    const productId = Ids.short();

    if (!req.file) {
      throw new HandledError("Image is required.");
    }

    const imageId = Ids.object();

    const image = await sharp(req.file.buffer)
      .resize(256, 256)
      .png({
        compressionLevel: 6,
        quality: 100,
      })
      .toBuffer();

    await Cloud.uploadObject({
      key: `reward-products/${imageId}.png`,
      body: image,
      contentType: "image/png",
    });

    const baseDocument = {
      _id: productId,
      kind,
      displayName,
      slug,
      imageId,
      gemCost,
      createDate: new Date(),
      editDate: new Date(),
      disabled: true,
    };

    let product: RewardProductDocument;

    if (kind === "tokens") {
      if (!tokenAmount) {
        throw new HandledError("Invalid token amount.");
      }

      product = {
        ...baseDocument,
        kind: "tokens",
        tokenAmount,
      };
    } else if (kind === "case") {
      const chest = await Database.collection("chests").findOne({
        _id: chestId,
      });

      if (!chest) {
        throw new HandledError("Invalid chest id.");
      }

      product = {
        ...baseDocument,
        kind: "case",
        chest: Chests.getBasicChest(chest),
      };
    } else {
      throw new HandledError("Unknown product kind.");
    }

    await Database.collection("reward-products").insertOne(product);

    await Admin.log({
      kind: "reward-product-create",
      admin: Users.getBasicUser(admin),
      product,
    });

    res.json({ product });
  },
});
