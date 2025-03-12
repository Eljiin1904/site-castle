import { Random } from "@server/services/random";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-seeds",
  secure: true,
  callback: async (req, res) => {
    const user = req.user;

    const pair = await Random.getUserPair({
      userId: user._id,
    });

    res.json({
      clientSeed: pair.clientSeed,
      serverSeedHashed: Random.hashServerSeed(pair.serverSeed),
      nextServerSeedHashed: Random.hashServerSeed(pair.nextServerSeed || ""),
      nonce: pair.nonce,
    });
  },
});
