import sharp from "sharp";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Ids } from "@server/services/ids";
import { Cloud } from "@server/services/cloud";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "edit-avatar",
  points: 3,
  durationSeconds: 24 * 60 * 60 * 1,
  errorMessage: "You are changing your avatar too often.",
});

export default Http.createApiRoute({
  type: "post",
  path: "/edit-avatar",
  restricted: true,
  secure: true,
  captcha: true,
  file: "image",
  callback: async (req, res) => {
    const user = req.user;

    if (!req.file) {
      throw new HandledError("Avatar image is required.");
    }

    await rateLimiter.consume(req.user._id, 1);

    const image = await sharp(req.file.buffer)
      .jpeg({
        quality: 70,
      })
      .toBuffer();

    const imageId = Ids.object();

    await Cloud.uploadObject({
      key: `avatars/${imageId}.jpg`,
      body: image,
      contentType: "image/jpeg",
    });

    await Database.collection("users").updateOne(
      { _id: user._id },
      { $set: { avatarId: imageId } },
    );

    res.json({});
  },
});
