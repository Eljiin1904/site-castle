import { Validation } from "@core/services/validation";
import { Random } from "@server/services/random";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/rotate-seeds",
  restricted: true,
  secure: true,
  body: Validation.object({
    newClientSeed: Validation.string().required("Client seed is required."),
  }),
  callback: async (req, res) => {
    const { newClientSeed } = req.body;
    const user = req.user;

    await Random.rotateUserPair({
      userId: user._id,
      newClientSeed,
    });

    res.json({});
  },
});
