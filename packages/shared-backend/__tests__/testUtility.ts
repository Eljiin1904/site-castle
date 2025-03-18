import { UserDocument } from "@core/types/users/UserDocument";
import { Ids } from "@server/services/ids";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { UserReferer } from "@core/types/users/UserReferer";
import { Random } from "@server/services/random";
import { Dice } from "@core/services/dice";
import { DiceTicketDocument } from "@core/types/dice/DiceTicketDocument";
import { Users } from "@core/services/users";
import { UserRole } from "@core/types/users/UserRole";

export function parseCookie(cookieString: string) {
  const cookies = cookieString.split(";");
  const sessionCookie = cookies.find((cookie) => cookie.trim().startsWith("connect.sid="));
  return sessionCookie ? sessionCookie.trim().split("=")[1] : null;
}

export async function fetchWithCookie(
  url: string,
  method: "POST" | "GET" | "DELETE" | "PUT",
  body: object,
  sessionCookie: string,
) {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Cookie: `connect.sid=${sessionCookie}`, // Include the session cookie
    },
    body: JSON.stringify(body),
  });
}

export async function handleFetch(
  url: string,
  method: "POST" | "GET" | "DELETE" | "PUT",
  body?: string | object,
) {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function handleLogin(
  base_url: string,
  login_details: { username: string; password: string },
  captchaToken: string,
) {
  let url = base_url + "/auth/local";
  const response = await handleFetch(url, "POST", { ...login_details, captchaToken });
  const result = await response.json();

  const setCookieHeader: string = response.headers.get("set-cookie") || "";
  const sessionCookie: string = parseCookie(setCookieHeader) || "";

  url = base_url + "/auth/session";
  let sessionResponse = await fetchWithCookie(
    url,
    "POST",
    { userId: result.user._id },
    sessionCookie,
  );
  return [sessionResponse, sessionCookie];
}

export const createTestUser = (
  username: string = "tester",
  email: string = "test@gmail.com",
  role: UserRole = "user",
  passwordHash: string = "password123",
): UserDocument => {
  const userId = Ids.long();
  const emailConfirmed = true;
  const referer: UserReferer = { kind: "none" };
  const steamId = undefined;
  const googleId = undefined;
  const discordId = undefined;
  const twitchId = undefined;

  return {
    _id: userId,
    registerDate: new Date(),
    referer,
    referral: undefined,
    locale: "en",
    username,
    email,
    emailConfirmed,
    role: role,
    tags: [],
    avatarIndex: Numbers.randomInt(1, 16),
    tokenBalance: 10000,
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
    tfa: {
      enabled: true,
      secret: "",
      recoveryHash: "",
    },
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
};

export const createTestTicket = async ({
  user,
  targetKind,
  targetValue,
  rollValue,
}: {
  user: UserDocument;
  targetKind: "over" | "under";
  targetValue: number;
  rollValue: number;
}): Promise<DiceTicketDocument> => {
  const ticketId = await Ids.incremental({
    key: "diceTicketId",
    baseValue: 1000000,
    batchSize: 100,
  });

  const { serverSeed, clientSeed, nonce } = await Random.nextUserNonce(user._id);
  const betAmount = Intimal.fromDecimal(10);

  const multiplier = Dice.getMultiplier({ targetValue, targetKind });
  const won = Dice.isWin({ targetKind, targetValue, rollValue });
  const wonAmount = won ? Math.round(100 * multiplier) : 0;

  return {
    _id: ticketId,
    timestamp: new Date(),
    user: Users.getBasicUser(user),
    betAmount,
    targetValue,
    targetKind,
    multiplier,
    clientSeed,
    serverSeed,
    serverSeedHashed: Random.hashServerSeed(serverSeed),
    nonce,
    rollValue,
    won,
    wonAmount,
  };
};
