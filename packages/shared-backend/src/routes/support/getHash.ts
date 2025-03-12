import crypto from "crypto";
import { Http } from "#app/services/http";
import config from "#app/config";

export default Http.createApiRoute({
  type: "post",
  path: "/get-hash",
  secure: true,
  callback: async (req, res) => {
    const secret = config.intercomSecret;
    const userId = req.user._id;
    const hash = crypto.createHmac("sha256", secret).update(userId).digest("hex");

    res.json({ hash });
  },
});
