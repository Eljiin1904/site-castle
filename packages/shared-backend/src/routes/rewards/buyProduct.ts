import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Rewards } from "@server/services/rewards";

export default Http.createApiRoute({
  type: "post",
  path: "/buy-product",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    productId: Validation.string().required("Product ID is required"),
  }),
  callback: async (req, res) => {
    const { productId } = req.body;
    const user = req.user;

    await Site.validateToggle("rewardsEnabled");
    await Site.validateSuspension(user);

    const product = await Database.collection("reward-products").findOne({
      _id: productId,
    });

    if (!product) {
      throw new HandledError("Product not found.");
    }
    if (product.disabled) {
      throw new HandledError("Product not currently available.");
    }

    if (user.gemBalance < product.gemCost) {
      throw new HandledError("You do not have enough gems.");
    }

    await Rewards.buyProduct({ user, product });

    res.json({});
  },
});
