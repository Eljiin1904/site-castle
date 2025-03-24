import { Numbers } from "@core/services/numbers";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserReferer } from "@core/types/users/UserReferer";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import bcrypt from "bcrypt";

export const initTestAdmin = async (
  username: string = "adminTest",
  email: string = "testAdmin@pidwin.com",
) => {
  const exisiting = await Database.collection("users").findOne({ email: email });
  if (exisiting) {
    console.log("Admin already created");
    return;
  }
  const userId = Ids.long();
  const emailConfirmed = true;
  const referer: UserReferer = { kind: "none" };
  const steamId = undefined;
  const googleId = undefined;
  const discordId = undefined;
  const twitchId = undefined;
  const passwordHash = await bcrypt.hash("password", 8);

  const user: UserDocument = {
    _id: userId,
    registerDate: new Date(),
    referer,
    referral: undefined,
    locale: "en",
    username,
    email,
    emailConfirmed,
    role: "admin",
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
    affiliate: {
      referralCount: 0,
      referralXp: 0,
      commissionBalance: 0,
      commissionTotal: 0,
    },
    tfa: { enabled: false },
    kyc: {
      tier: 3,
    },
    mute: {},
    suspension: {},
    ban: {},
    blockedUsers: [],
    meta: {
      activeDate: new Date(),
      tipLimit: 0,
    },
  };
  await Database.collection("users").insertOne(user);
};
