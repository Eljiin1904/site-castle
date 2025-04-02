import { Database } from "@server/services/database";
import { System } from "@server/services/system";

export default () => System.tryCatch(main)();

async function main() {
  await Database.collection("advent-tickets").createIndex({
    userId: 1,
    timestamp: -1,
  });
  await Database.collection("advent-tickets").createIndex({
    userId: 1,
    holidayId: 1,
  });

  await Database.collection("admin-log").createIndex({
    kind: 1,
    timestamp: -1,
  });

  await Database.collection("affiliate-referrals").createIndex(
    {
      affiliateId: 1,
      userId: 1,
    },
    { unique: true },
  );

  await Database.collection("affiliate-reports").createIndex({
    affiliateId: 1,
    userId: 1,
    timeframe: -1,
  });

  await Database.collection("affiliate-reloads").createIndex(
    {
      "user.id": 1,
    },
    { unique: true },
  );

  await Database.collection("case-battles").createIndex({ createDate: -1 });
  await Database.collection("case-battles").createIndex({ "players.id": 1 });
  await Database.collection("case-battles").createIndex({
    "user.id": 1,
    status: 1,
  });
  await Database.collection("case-battles").createIndex({
    status: 1,
    createDate: -1,
    _id: 1,
  });

  await Database.collection("chat-messages").createIndex({
    channel: 1,
    hidden: 1,
    timestamp: -1,
  });

  await Database.collection("chat-rain-tickets").createIndex({
    rainId: 1,
    "user.id": 1,
  });
  await Database.collection("chat-rain-tickets").createIndex({
    rainId: 1,
    "location.ip": 1,
  });

  await Database.collection("chest-drops").createIndex({
    "chest.id": 1,
    timestamp: -1,
  });

  await Database.collection("chest-reports").createIndex({
    "chest.id": 1,
    timeframe: -1,
  });

  await Database.collection("chest-games").createIndex({
    "chest.kind": 1,
    "user.id": 1,
    processed: 1,
    timestamp: -1,
    _id: 1,
  });
  await Database.collection("chest-games").createIndex({
    processsed: 1,
    timestamp: -1,
  });

  await Database.collection("chests").createIndex({
    kind: 1,
  });

  await Database.collection("crypto-quotes").createIndex(
    { expires: -1 },
    { expireAfterSeconds: 0 },
  );

  await Database.collection("crypto-wallets").createIndex({
    userId: 1,
    timestamp: -1,
  });

  await Database.collection("dice-tickets").createIndex({
    timestamp: -1,
  });
  await Database.collection("dice-tickets").createIndex({
    "user.id": 1,
    processed: 1,
    timestamp: -1,
  });

  await Database.collection("double-rounds").createIndex({ timestamp: -1 });

  await Database.collection("double-tickets").createIndex({ timestamp: -1 });
  await Database.collection("double-tickets").createIndex({ roundId: 1 });
  await Database.collection("double-tickets").createIndex({
    roundId: 1,
    userId: 1,
    betKind: 1,
  });
  await Database.collection("double-tickets").createIndex({
    "user.id": 1,
    processed: 1,
    timestamp: -1,
  });

  await Database.collection("email-info").createIndex({ email: 1 });

  await Database.collection("gift-batches").createIndex({ timestamp: -1 });

  await Database.collection("gift-cards").createIndex({ batchId: 1 });

  await Database.collection("limbo-tickets").createIndex({
    timestamp: -1,
  });
  await Database.collection("limbo-tickets").createIndex({
    "user.id": 1,
    processed: 1,
    timestamp: -1,
  });

  await Database.collection("ip-info").createIndex({ ip: 1 });

  await Database.collection("items").createIndex({
    marketHashName: 1,
  });
  await Database.collection("items").createIndex({
    "loot.tokenValue": 1,
  });

  await Database.collection("market-inventories").createIndex({
    userId: 1,
  });
  await Database.collection("market-inventories").createIndex(
    { expires: -1 },
    { expireAfterSeconds: 0 },
  );

  await Database.collection("market-items").createIndex({
    provider: 1,
    externalId: 1,
  });
  await Database.collection("market-items").createIndex({
    tokenValue: -1,
    _id: 1,
  });

  await Database.collection("mines-events").createIndex({
    timestamp: -1,
  });

  await Database.collection("mines-games").createIndex({
    "user.id": 1,
    completed: 1,
  });

  await Database.collection("holiday-events").createIndex({
    endDate: -1,
    startDate: -1,
  });

  await Database.collection("notifications").createIndex({
    userId: 1,
    timestamp: -1,
  });

  await Database.collection("promotion-codes").createIndex({ timestamp: -1 });

  await Database.collection("promotion-tickets").createIndex({
    promotionId: 1,
    userId: 1,
  });
  await Database.collection("promotion-tickets").createIndex({
    promotionId: 1,
    ip: 1,
  });

  await Database.collection("races").createIndex({
    endDate: -1,
    startDate: -1,
  });

  await Database.collection("raffles").createIndex({
    endDate: -1,
    startDate: -1,
  });

  await Database.collection("raffle-tickets").createIndex({
    raffleId: 1,
    ticketIndex: 1,
  });

  await Database.collection("reward-boost-events").createIndex({
    timeframe: 1,
    endDate: -1,
    startDate: 1,
  });

  await Database.collection("reward-boost-tickets").createIndex({
    userId: 1,
    timestamp: -1,
    timeframe: 1,
  });
  await Database.collection("reward-boost-tickets").createIndex({
    userId: 1,
    eventId: 1,
  });

  await Database.collection("site-activity").createIndex({
    timestamp: -1,
  });
  await Database.collection("site-activity").createIndex({
    amount: 1,
    timestamp: -1,
  });
  await Database.collection("site-activity").createIndex(
    { expires: -1 },
    { expireAfterSeconds: 0 },
  );

  await Database.collection("site-bets").createIndex({
    timestamp: -1,
  });
  await Database.collection("site-bets").createIndex({
    betAmount: -1,
    timestamp: -1,
  });
  await Database.collection("site-bets").createIndex({
    "user.id": 1,
    timestamp: -1,
  });

  await Database.collection("reward-claims").createIndex({
    userId: 1,
    timestamp: -1,
  });

  await Database.collection("site-stats").createIndex({
    timestamp: -1,
  });

  await Database.collection("swapped-wallets").createIndex({
    userId: 1,
  });

  await Database.collection("system-log").createIndex({
    kind: 1,
    timestamp: -1,
  });

  await Database.collection("tokens").createIndex({ expires: -1 }, { expireAfterSeconds: 0 });
  await Database.collection("tokens").createIndex({
    kind: 1,
    token: 1,
  });

  await Database.collection("transactions").createIndex({
    timestamp: -1,
  });
  await Database.collection("transactions").createIndex({
    "user.id": 1,
    timestamp: -1,
  });
  await Database.collection("transactions").createIndex(
    {
      externalId: 1,
    },
    {
      unique: true,
      sparse: true,
    },
  );
  await Database.collection("transactions").createIndex({
    kind: 1,
    status: 1,
    timestamp: 1,
  });

  await Database.collection("transaction-reports").createIndex({
    timeframe: -1,
  });

  await Database.collection("users").createIndex(
    { username: 1 },
    {
      unique: true,
      collation: { locale: "en", strength: 2 },
    },
  );
  await Database.collection("users").createIndex(
    { email: 1 },
    {
      unique: true,
      collation: { locale: "en", strength: 2 },
    },
  );
  await Database.collection("users").createIndex({ discordId: 1 });

  await Database.collection("user-actions").createIndex({ "user.id": 1 });

  await Database.collection("user-bet-sessions").createIndex(
    { expires: -1 },
    { expireAfterSeconds: 0 },
  );

  await Database.collection("user-holds").createIndex(
    { userId: 1 },
    {
      unique: true,
    },
  );
  await Database.collection("user-holds").createIndex({ expires: -1 }, { expireAfterSeconds: 0 });

  await Database.collection("user-reports").createIndex({ timeframe: -1 });
  await Database.collection("user-reports").createIndex({
    userId: 1,
    timeframe: -1,
  });

  await Database.collection("user-seed-pairs").createIndex({
    userId: 1,
  });
}
