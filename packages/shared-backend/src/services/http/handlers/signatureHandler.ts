import { HandledError } from "@server/services/errors";
import { Http } from "..";
import { Security } from "@server/services/security";
import config from "@server/config";

const signatureType = {
  hub8: "X-Hub88-Signature",
};
export const signatureHandler = (type: string) =>
  Http.createHandler(async (req, res, next) => {
    const { hub88PrivateKey } = config;
    const headers = req.headers;
    const headerValue = headers[type];
    if (headers[type]) {
      const encoder = new TextEncoder();
      // const uint8Array = encoder.encode(headerValue);
      // if (type == "hub8") headerValue Security.decrypt(hubEightPrivateKey, headerValue);
    }
    next();
  });
