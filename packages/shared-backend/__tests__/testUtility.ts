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
import { UserSuspensionData } from "@core/types/users/UserSuspensionData";
import { expect } from "vitest";
import { DatabaseCollections } from "@core/types/database/DatabaseCollections";
import { Database } from "@server/services/database";
import { BlackjackBetAmounts } from "@core/types/blackjack/BlackjackBetAmounts";
import { BlackjackGameDocument } from "@core/types/blackjack/BlackjackGameDocument";

// Testing functions
export const findUserOrFailTest = async (username: string) => {
  const collection = Database.collection("users");
  const user = await collection.findOne({ username });
  if (!user) {
    return expect.fail();
  }
  return { user };
};

// Database functions
export const resetDatabaseConnection = async (collection: keyof DatabaseCollections) => {
  if (await Database.hasCollection(collection)) {
    Database.collection(collection).deleteMany({});
  } else {
    await Database.createCollection(collection, {});
  }
};

// Use this function for cleanup
// Resets collections in parallel
export const resetDatabaseConnections = async (collections: (keyof DatabaseCollections)[]) => {
  const promises = collections.map((collection) => {
    return resetDatabaseConnection(collection);
  });
  await Promise.allSettled(promises);
};

// General functions
// Fetching / Requests
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
    body: method == "GET" ? null : JSON.stringify(body),
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

// User
export const createTestUser = (
  username: string = "tester",
  email: string = "test@gmail.com",
  role: UserRole = "user",
  passwordHash: string = "password123",
  tokenBalance: number = 100000,
  suspended: boolean = false,
  emailConfirmed: boolean = true,
  referer: UserReferer = { kind: "none" },
): UserDocument => {
  const userId = Ids.long();
  const steamId = undefined;
  const googleId = undefined;
  const discordId = undefined;
  const twitchId = undefined;
  const suspensionData: UserSuspensionData = suspended
    ? {
        reason: "self-exclude",
        startDate: new Date(),
        endDate: undefined,
      }
    : {};

  return {
    _id: userId,
    registerDate: new Date(),
    referer,
    referral: undefined,
    locale: "en",
    username,
    email,
    emailConfirmed: emailConfirmed,
    role: role,
    tags: [],
    avatarIndex: Numbers.randomInt(1, 16),
    tokenBalance: tokenBalance,
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
    suspension: suspensionData,
    ban: {},
    blockedUsers: [],
    meta: {
      activeDate: new Date(),
      tipLimit: 0,
    },
  };
};

// Login
export async function handleLogin(
  base_url: string,
  login_details: { username: string; password: string },
  captchaToken: string,
): Promise<[Response, string]> {
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

type HandleUserLoginArgs = {
  user: Pick<UserDocument, "username">;
  password?: string;
  siteAPI: string;
  hCaptchaToken: string;
};
export const handleUserLogin = async (args: HandleUserLoginArgs) => {
  const { user, siteAPI, hCaptchaToken, password = "password123" } = args;
  const [sessionResponse, sessionCookie] = await handleLogin(
    siteAPI,
    {
      username: user.username,
      password,
    },
    hCaptchaToken,
  );
  return {
    sessionResponse,
    sessionCookie,
  };
};

// Dice functions
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

// Blackjack functions
export async function createBlackjackGame(
  URL: string,
  sessionCookie: string,
  betAmounts: BlackjackBetAmounts,
) {
  const getManualBlackjack = await fetchWithCookie(URL, "POST", { betAmounts }, sessionCookie);
  const getBlackjackState = await getManualBlackjack.json();
  return {
    getManualBlackjack,
    getBlackjackState,
  };
}

type PerformBlackjackActionArgs = {
  action: "hit" | "stand" | "double" | "split";
  gameId: string;
  syncIndex: number;
};

export async function performBlackjackAction(
  URL: string,
  sessionCookie: string,
  args: PerformBlackjackActionArgs,
) {
  await fetchWithCookie(URL, "POST", args, sessionCookie);
}

type VirtualCard = {
  suit: "spades" | "hearts" | "clubs" | "diamonds";
  value: number | "A" | "J" | "Q" | "K";
};

function getCardValuesFromSimulationObject(
  cards: {
    orderIndex: number;
    data: VirtualCard[];
  }[],
) {
  return cards.map((card) => {
    return card.data;
  });
}

export function resolveBlackjackSimulationValues(
  gameCreationSimulationWithSeeds: any,
  userId: String,
) {
  // "gameCreationSimulationWithSeeds" is of an undefined type before the game gets saved to database
  return {
    dealer: getCardValuesFromSimulationObject(
      gameCreationSimulationWithSeeds.dealer.hands?.[0]?.cards ?? [],
    ),
    player: getCardValuesFromSimulationObject(
      // @ts-expect-error
      gameCreationSimulationWithSeeds.players.find((player) => player.userId === userId)?.hands?.[0]
        ?.cards ?? [],
    ),
  } as unknown as {
    dealer: VirtualCard[];
    player: VirtualCard[];
  };
}

export async function lookupBlackjackGame(
  userId: string,
  gameId?: string,
): Promise<BlackjackGameDocument | null> {
  if (gameId) {
    return await Database.collection("blackjack-games").findOne({
      _id: gameId,
    });
  }
  return await Database.collection("blackjack-games").findOne({
    players: {
      $elemMatch: {
        userId,
      },
    },
  });
}
