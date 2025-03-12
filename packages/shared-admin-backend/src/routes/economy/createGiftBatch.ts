import { Validation } from "@core/services/validation";
import { GiftBatchDocument } from "@core/types/economy/GiftBatchDocument";
import { GiftCardDocument } from "@core/types/economy/GiftCardDocument";
import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";
import { Database } from "@server/services/database";
import { Economy } from "@server/services/economy";
import { Ids } from "@server/services/ids";
import { Admin } from "@server/services/admin";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/create-gift-batch",
  body: Validation.object({
    batchId: Validation.string().required("Batch ID is required."),
    batchSize: Validation.integer("Batch Size").min(1).max(10000),
    tokenAmount: Validation.currency("Token amount"),
    tag: Validation.string().required().oneOf(Economy.giftCardTags, "Invalid tag."),
  }),
  callback: async (req, res) => {
    const { batchId, batchSize, tokenAmount, tag } = req.body;
    const admin = req.user;

    if (await Database.exists("gift-batches", { _id: batchId })) {
      throw new HandledError("Batch ID already exists.");
    }

    const cardIds = [...Array(batchSize)].map(() => Ids.ticket());

    const batch: GiftBatchDocument = {
      _id: batchId,
      timestamp: new Date(),
      tokenAmount,
      tag,
      createdCount: batchSize,
      usedCount: 0,
    };

    await Database.collection("gift-batches").insertOne(batch);

    const cards: GiftCardDocument[] = cardIds.map((_id) => ({
      _id,
      timestamp: new Date(),
      batchId,
      tokenAmount,
      tag,
    }));

    await Database.collection("gift-cards").insertMany(cards);

    await Admin.log({
      kind: "gift-batch-create",
      admin: Users.getBasicUser(admin),
      batch,
    });

    res.json({ batch });
  },
});
