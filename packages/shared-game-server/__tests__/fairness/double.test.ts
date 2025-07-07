// Libraries
import { expect, describe, it, beforeEach } from "vitest";
// Double Setup
import * as Managers from "../../src/managers";
// Services
import { Database } from "@server/services/database";
import { Random } from "@server/services/random";
import { Ids } from "@server/services/ids";
import { Users } from "@core/services/users";
import { BlockInfo } from "@server/services/random/Random";
// Testing helpers
import { createTestUser, resetDatabaseConnections } from "../testUtility";
// Types
import { DoubleRoundDocument } from "@core/types/double/DoubleRoundDocument";
import { DoubleTicketDocument } from "@core/types/double/DoubleTicketDocument";
import { DoubleRoundStatus } from "@core/types/double/DoubleRoundStatus";
import { DoubleRoll } from "@core/types/double/DoubleRoll";

// Consts
const serverSeed = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
// Valid EOS block ID that was ran and will now be used as reference
const eosBlockId = "1a808460d5e9ae17638fdca8492d3fcb5a8fb148e163254bae3b4f434a9e5f13";
const eosBlockNum = 444630112;
const eosBlockDate = new Date("2025-07-03T20:49:46.000Z");
const expectedRollValues: Partial<DoubleRoll> = {
  value: 13,
  color: "black",
  bait: false,
};

describe("Double Fairness", () => {
  const doubleFairnesssTester = {
    ...createTestUser("double-fairness-tester", "double-fairness-tester@pidwin.com"),
    tokenBalance: 1000000000,
  };

  beforeEach(async () => {
    // Reset database collections used for these tests
    await Database.collection("users").deleteOne({
      username: "double-fairness-tester",
    });
    await Promise.all([
      resetDatabaseConnections(["double-tickets", "double-rounds"]),
      Database.collection("users").insertOne(doubleFairnesssTester),
    ]);
  });

  it("Should provide an expected roll result to pre-defined server seeds, EOS blocks, and nonces", async () => {
    const round = await initializeDoubleRound(serverSeed, "pending", {
      eosBlockId: eosBlockId,
      eosBlockNum: eosBlockNum,
      eosBlockDate: eosBlockDate,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    Managers.double();
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const doubleRound = await Database.collection("double-rounds").findOne({
      _id: round._id,
    });
    expect(doubleRound).not.toBeNull();
    expect(doubleRound?._id).toBe(round._id);
    expect(doubleRound?.roll?.value).toBe(expectedRollValues.value);
    expect(doubleRound?.roll?.color).toBe(expectedRollValues.color);
    expect(Boolean(doubleRound?.roll?.bait)).toEqual(Boolean(expectedRollValues.bait));
  }, 10000);

  it("Should provide an expected roll result to pre-defined server seeds, EOS blocks, and nonces, and compare against wager", async () => {
    const round = await initializeDoubleRound(
      serverSeed,
      "simulating",
      {
        eosBlockId,
        eosBlockNum,
        eosBlockDate,
      },
      { ...expectedRollValues, offset: 1 } as DoubleRoll,
    );

    const doubleRound = await Database.collection("double-rounds").findOne({
      _id: round._id,
    });

    const ticketId = await Ids.incremental({
      key: "doubleTicketId",
      baseValue: 1000000,
      batchSize: 100,
    });

    const ticket: DoubleTicketDocument = {
      _id: ticketId,
      timestamp: new Date(),
      roundId: round._id,
      user: Users.getBasicUser(doubleFairnesssTester),
      betAmount: 100,
      betKind: "red",
    };

    await Database.collection("double-tickets").insertOne(ticket);
    Managers.double();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    expect(doubleRound).not.toBeNull();
    expect(doubleRound?._id).toBe(round._id);
    expect(doubleRound?.status).toBe("simulating");
    expect(doubleRound?.roll?.value).toBe(expectedRollValues.value);
    expect(doubleRound?.roll?.color).toBe(expectedRollValues.color);
    expect(Boolean(doubleRound?.roll?.bait)).toEqual(Boolean(expectedRollValues.bait));

    const doubleTicketForWager = await Database.collection("double-tickets").findOne({
      roundId: doubleRound?._id,
    });

    expect(doubleTicketForWager).not.toBeNull();
    expect(doubleTicketForWager?.roundId).toBe(round._id);
    expect(doubleTicketForWager?.betAmount).toBe(100);
    expect(doubleTicketForWager?.betKind).toBe("red");
    expect(doubleTicketForWager?.processed).toBeTruthy();
  });
}, 10000000);

// Setup helper functions
function formatRound(
  round: Partial<DoubleRoundDocument>,
  eosBlock?: BlockInfo,
  roll?: DoubleRoll,
): DoubleRoundDocument {
  let roundCopy = { ...round };
  if (eosBlock) {
    roundCopy = { ...roundCopy, ...eosBlock };
  }
  if (roll) {
    roundCopy = { ...roundCopy, roll };
  }
  return roundCopy as DoubleRoundDocument;
}

async function createDoubleRound(
  serverSeed: string,
  status: DoubleRoundStatus,
  eosBlock?: BlockInfo,
  roll?: DoubleRoll,
): Promise<DoubleRoundDocument> {
  const roundId = "1234567";
  const serverSeedHash = Random.hashServerSeed(serverSeed);
  let round: DoubleRoundDocument = {
    _id: roundId,
    timestamp: new Date(),
    serverSeed,
    serverSeedHash,
    statusDate: new Date(),
    status: "waiting",
  };
  if (status === "waiting") {
    return round;
  }
  if (["pending", "simulating", "completed"].includes(status)) {
    if (eosBlock) {
      return formatRound({ ...round, status }, eosBlock, roll);
    } else {
      const blockNow = await Random.getEosBlockNow();
      const eosBlockNum = blockNow.eosBlockNum + 4;
      const { eosBlockId } = await Random.getEosBlock(eosBlockNum);
      if (status === "pending") {
        return formatRound(
          {
            ...round,
            status,
            eosBlockNum,
            eosCommitDate: new Date(),
          },
          undefined,
          roll,
        );
      } else if (status === "completed" || status === "simulating") {
        return formatRound(
          {
            ...round,
            status,
            eosBlockId,
            eosBlockNum,
            eosCommitDate: new Date(),
          },
          undefined,
          roll,
        );
      }
    }
  }
  return round;
}

async function initializeDoubleRound(
  serverSeed: string,
  status: DoubleRoundStatus,
  eosBlock?: BlockInfo,
  roll?: DoubleRoll,
): Promise<DoubleRoundDocument> {
  const round = await createDoubleRound(serverSeed, status, eosBlock, roll);
  await insertDoubleRound(round);
  return round;
}

async function insertDoubleRound(round: DoubleRoundDocument): Promise<void> {
  await Database.collection("double-rounds").deleteOne({
    _id: round._id,
  });
  await Database.collection("double-rounds").insertOne(round);
}
