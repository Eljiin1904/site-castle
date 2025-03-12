import sharp from "sharp";
import { Validation } from "@core/services/validation";
import { Strings } from "@core/services/strings";
import { Users } from "@server/services/users";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Cloud } from "@server/services/cloud";
import { Ids } from "@server/services/ids";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/edit-product",
  file: "image",
  body: Validation.object({
    productId: Validation.string().required("Product ID is required."),
    displayName: Validation.string().required("Display name is required."),
    gemCost: Validation.currency("Gem cost"),
    disabled: Validation.boolean().required("Disabled is required"),
    featured: Validation.boolean().required("Featured is required"),
  }),
  callback: async (req, res) => {
    const { productId, displayName, gemCost, disabled, featured } = req.body;
    const slug = Strings.toSlug(displayName);
    const admin = req.user;

    const setter: Record<string, any> = {
      displayName,
      slug,
      gemCost,
      disabled,
      featured,
      editDate: new Date(),
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
        key: `reward-products/${imageId}.png`,
        body: image,
        contentType: "image/png",
      });

      setter.imageId = imageId;
    }

    await Database.collection("reward-products").updateOne({ _id: productId }, { $set: setter });

    await Admin.log({
      kind: "reward-product-edit",
      admin: Users.getBasicUser(admin),
      productId,
    });

    res.json({});
  },
});
