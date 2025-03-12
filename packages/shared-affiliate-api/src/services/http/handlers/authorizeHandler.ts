import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "@server/services/http";
import { Security } from "@server/services/security";

const schema = Validation.object({
  key: Validation.string().required("Key is required."),
});

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "shared-affiliate-api",
  points: 30,
  durationSeconds: 60,
  errorMessage: "Too many requests.",
});

export const authorizeHandler = Http.createHandler(async (req, res, next) => {
  const { key } = await schema.validate(req.query);

  const data = await Database.collection("affiliate-keys").findOne({ key });

  if (!data) {
    throw new HandledError("Key is not valid.");
  }

  if (!data.enabled) {
    throw new HandledError("Key is disabled.");
  }

  req.affiliateId = data.affiliateId;

  await rateLimiter.consume(key, 1);

  next();
});
