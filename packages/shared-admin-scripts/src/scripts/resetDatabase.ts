import { Intimal } from "@core/services/intimal";
import { Database } from "@server/services/database";
import config from "#app/config";

export async function resetDatabase() {
  if (config.env === "production") {
    // just in case..
    return console.error("PRODUCTION!");
  }

  const dbCollections = await Database.db().collections();

  const ignores = [
    "admin-sessions",
    "chests",
    "crypto-rates",
    "crypto-wallets",
    "items",
    "settings",
    "push-subscriptions",
    "reward-boost-events",
    "reward-products",
    "users",
    "user-bet-sessions",
    "user-sessions",
    "user-latency",
  ];

  for (const collection of dbCollections) {
    if (ignores.includes(collection.collectionName)) {
      continue;
    }

    await Database.db().dropCollection(collection.collectionName);
  }

  const users = Database.collection("users").find({});

  for await (const user of users) {
    await Database.collection("users").replaceOne(
      {
        _id: user._id,
      },
      {
        registerDate: user.registerDate,
        referer: user.referer,
        referral: user.referral,
        locale: user.locale,
        username: user.username,
        email: user.email,
        emailConfirmed: user.emailConfirmed,
        role: user.role,
        tags: user.tags,
        avatarIndex: user.avatarIndex,
        avatarId: user.avatarId,
        tokenBalance: Intimal.fromDecimal(5000),
        gemBalance: 0,
        xp: 0,
        stats: {},
        chestKeys: {},
        settings: user.settings,
        passwordHash: user.passwordHash,
        passwordSet: user.passwordSet,
        steamId: user.steamId,
        googleId: user.googleId,
        discordId: user.discordId,
        twitchId: user.twitchId,
        affiliate: {
          referralCount: user.affiliate.referralCount,
          referralXp: 0,
          commissionBalance: 0,
          commissionTotal: 0,
        },
        tfa: user.tfa,
        kyc: {
          tier: 0,
        },
        mute: {},
        suspension: {},
        ban: {},
        blockedUsers: [],
        meta: {
          activeDate: user.meta.activeDate,
        },
      },
    );
  }
  console.log("Database reset.");
}
