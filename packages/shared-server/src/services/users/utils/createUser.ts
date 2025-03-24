import { Numbers } from "@core/services/numbers";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserReferer } from "@core/types/users/UserReferer";
import { UserRole } from "@core/types/users/UserRole";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";

export async function createUser({
  referer,
  username,
  role,
  email,
  emailConfirmed,
  passwordHash,
  steamId,
  googleId,
  discordId,
  twitchId,
  walletAddress,
}: {
  referer?: UserReferer;
  username: string;
  role?: UserRole;
  email: string;
  emailConfirmed: boolean;
  passwordHash?: string;
  steamId?: string;
  googleId?: string;
  discordId?: string;
  twitchId?: string;
  walletAddress?: string;
}) {
  const userId = Ids.long();

  referer = referer ?? { kind: "none" };

  const user: UserDocument = {
    _id: userId,
    registerDate: new Date(),
    referer,
    referral: undefined,
    locale: "en",
    username,
    email,
    emailConfirmed,
    role: role ?? "user",
    tags: [],
    avatarIndex: Numbers.randomInt(1, 16),
    tokenBalance: 0,
    gemBalance: 0,
    xp: 0,
    stats: {},
    chestKeys: {},
    settings: {
      largeBetConfirm: true,
      unusualBetConfirm: true,
      receiveTips: true,
      login2fa: false,
      bet2fa: false,
      withdraw2fa: true,
      hiddenMode: false,
    },
    passwordHash,
    passwordSet: passwordHash !== undefined,
    steamId,
    googleId,
    discordId,
    twitchId,
    walletAddress,
    affiliate: {
      referralCount: 0,
      referralXp: 0,
      commissionBalance: 0,
      commissionTotal: 0,
    },
    tfa: {},
    kyc: {
      tier: 0,
    },
    mute: {},
    suspension: {},
    ban: {},
    blockedUsers: [],
    meta: {
      activeDate: new Date(),
    },
  };

  await Database.collection("users").insertOne(user);

  return user;
}
