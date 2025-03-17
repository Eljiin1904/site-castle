import { UserDocument } from "@core/types/users/UserDocument";
import { Ids } from "@server/services/ids";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { UserReferer } from "@core/types/users/UserReferer";
import { Random } from "@server/services/random";
import { Dice } from "@core/services/dice";
import { DiceTicketDocument } from "@core/types/dice/DiceTicketDocument";
import { Users } from "@core/services/users";
import { Limbo } from "@server/services/limbo";
import { LimboTicketDocument } from "@core/types/limbo/LimboTicketDocument";
import { ChestItem, ChestItemOptions } from "@core/types/chests/ChestItem";
import { Database } from "@server/services/database";
import { Items } from "@core/services/items";
import { HandledError } from "@server/services/errors";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { ChestGameDocument } from "@core/types/chests/ChestGameDocument";
import { getGameId } from "@server/services/chests/Chests";
import { Chests } from "@server/services/chests";
import { UserRole } from "@core/types/users/UserRole";

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
    tfa: { enabled: true },
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

export const createTestLimboTicket = async ({
  rollValue,
  betAmount,
  targetValue,
  user,
}: {
  betAmount: number;
  rollValue: number;
  targetValue: number;
  user: UserDocument;
}): Promise<LimboTicketDocument> => {
  const ticketId = await Ids.incremental({
    key: "limboTicketId",
    baseValue: 1000000,
    batchSize: 100,
  });

  const { serverSeed, clientSeed, nonce } = await Random.nextUserNonce(user._id);
  const multiplier = Numbers.round(Limbo.getMultiplier({ targetValue }), 2);
  const won = Limbo.isWin({ targetValue, rollValue });
  const wonAmount = won ? Math.round(betAmount * multiplier) : 0;

  return {
    _id: ticketId,
    timestamp: new Date(),
    user: Users.getBasicUser(user),
    betAmount,
    targetValue,
    multiplier,
    clientSeed,
    serverSeed,
    serverSeedHashed: Random.hashServerSeed(serverSeed),
    nonce,
    rollValue,
    rollMultiplier: Numbers.floor(Limbo.getMultiplier({ targetValue: rollValue }), 2),
    won,
    wonAmount,
  };
};

export async function buildTestItems(options: ChestItemOptions[]) {
  const documents = await Database.collection("items")
    .find({ _id: { $in: options.map((x) => x.id) } })
    .toArray();

  const items = [];

  for (const info of options) {
    const document = documents.find((x) => x._id === info.id);

    if (!document) {
      throw new HandledError(`Invalid items, failed lookup on ${info.id}`);
    }

    const item: ChestItem = {
      ...Items.getLoot(document),
      ...info,
    };

    items.push(item);
  }

  return items;
}

export const createTestChestItem = ({
  symbol,
  slug,
  subType,
  edition,
  wear,
  baseName,
  styleName,
  dropRate,
  announce,
  jackpot,
  special,
  lootValue,
  lootCount,
}: ChestItem): ChestItem => {
  let itemId = Ids.long();
  return {
    id: itemId,
    symbol,
    slug,
    subType,
    edition,
    wear,
    baseName,
    styleName,
    dropRate,
    announce,
    jackpot,
    special,
    lootValue,
    lootCount,
  };
};

export const createTestChest = ({
  _id,
  kind,
  slug,
  imageId,
  displayName,
  items,
  openCost,
  createDate,
  editDate,
  disabled,
}: ChestDocument): ChestDocument => {
  let chestId = Ids.long();
  return {
    _id,
    kind,
    slug,
    imageId,
    displayName,
    items,
    openCost,
    createDate,
    editDate,
    disabled,
  };
};

export const createTestChestGame = async (user: UserDocument, chest: ChestDocument) => {
  const { serverSeed, clientSeed, nonce } = await Random.nextUserNonce(user?._id);
  const rollValue = Random.getRoll({
    serverSeed,
    clientSeed,
    nonce,
    maxValue: 1000000,
  });
  const roll = Chests.createRoll({ chest, specialEnabled: false, value: rollValue });
  const loot = chest.items[roll.lootIndex];

  let gameId;
  if (!gameId) {
    gameId = await getGameId();
  }

  const game: ChestGameDocument = {
    _id: gameId,
    timestamp: new Date(),
    user: Users.getBasicUser(user),
    chest: Chests.getBasicChest(chest),
    roll,
    loot,
    speed: "turbo",
    clientSeed,
    serverSeed,
    serverSeedHashed: Random.hashServerSeed(serverSeed),
    nonce,
  };

  return game;
};
