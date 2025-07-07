import { Http } from "#app/services/http";
import { Validation } from "@core/services/validation";
import { externalGameCategories } from "@core/types/hub-eight/GameInformation";
import { Database } from "@server/services/database";
import { subDays } from "date-fns";
import { buildDateFilter } from "./utils/hubEightDateFilter";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

const logger = getServerLogger({});

const buildSort = (sortIndex?: number): Record<string, 1 | -1> => {
  switch (sortIndex) {
    case 0:
      return { featured: -1, release_date: -1 };
    case 1:
      return { popular: 1 };
    case 2:
      return { name: 1 };
    case 3:
      return { name: -1 };
    default:
      return {};
  }
};

export default Http.createApiRoute({
  type: "post",
  path: "/games/list",
  body: Validation.object({
    category: Validation.string().oneOf(externalGameCategories).optional(),
    products: Validation.array().of(Validation.string()).optional(),
    new_release: Validation.boolean().optional(),
    bonus_buy: Validation.boolean().optional(),
    live: Validation.boolean().optional(),
    dateFilterType: Validation.string().oneOf(["today", "yesterday"]).optional(),
    year: Validation.number().min(1900).max(new Date().getFullYear()).optional(),
    month: Validation.number().min(1).max(12).optional(),
    days: Validation.number().min(1).optional(),
    enabled: Validation.boolean().nullable().default(null),
    searchText: Validation.string().optional(),
    sortIndex: Validation.index("Sort Index", 3).optional(),
    page: Validation.page().default(1),
    limit: Validation.limit().default(40),
  }),
  callback: async (req, res) => {
    const {
      category,
      products,
      new_release,
      bonus_buy,
      live,
      enabled,
      dateFilterType,
      year,
      month,
      days,
      searchText,
      sortIndex,
      page,
      limit,
    } = req.body;

    // Build query dynamically
    const query: any = {};

    // Filters
    if (category) query.site_category = category;
    if (products?.length) query.product = { $in: products };
    if (new_release) {
      query.release_date = { $gte: subDays(new Date(), 60).toISOString() };
    }
    if (live) query.live = true;
    if (bonus_buy) query.bonus_buy = true;
    if (enabled != null) query.enabled = enabled;
    const dateFilter = buildDateFilter({ dateFilterType, year, month, days });
    if (dateFilter) {
      query.release_date = dateFilter;
    }
    if (searchText) {
      query.name = { $regex: searchText, $options: "i" };
    }

    const sort = buildSort(sortIndex) ?? {};

    try {
      // Get rollback reference transaction UUIDs
      const rollbackDocs = await Database.collection("transactions")
        .find({ kind: "hub-eight-rollback" }, { projection: { referenceTransactionUUID: 1 } })
        .toArray();

      const rollbackedUUIDs = rollbackDocs
        .map((r) => (r as { referenceTransactionUUID: string }).referenceTransactionUUID)
        .filter(Boolean);

      // Get paginated games
      const total = await Database.collection("hub-eight-games").countDocuments(query);

      const games = await Database.collection("hub-eight-games")
        .find(query, {
          sort: { ...sort, _id: 1 },
          skip: (page - 1) * limit,
          limit,
        })
        .toArray();

      // Aggregate debit (wagers)
      const debitAgg = await Database.collection("transactions")
        .aggregate([
          {
            $match: {
              kind: "hub-eight-debit",
              transactionUUID: { $nin: rollbackedUUIDs },
            },
          },
          {
            $group: {
              _id: "$gameCode",
              totalWagered: { $sum: "$amount" },
              numberOfBets: { $sum: 1 },
            },
          },
        ])
        .toArray();

      // 4. Aggregate credit (win) transactions excluding rollbacks
      const creditAgg = await Database.collection("transactions")
        .aggregate([
          {
            $match: {
              kind: "hub-eight-credit",
              referenceTransactionUUID: { $nin: rollbackedUUIDs },
            },
          },
          {
            $group: {
              _id: "$gameCode",
              totalWin: { $sum: "$amount" },
            },
          },
        ])
        .toArray();

      // Maps
      const debitMap = new Map<string, { totalWagered: number; numberOfBets: number }>();
      debitAgg.forEach(({ _id, totalWagered, numberOfBets }) => {
        debitMap.set(_id, { totalWagered, numberOfBets });
      });

      const creditMap = new Map<string, { totalWin: number }>();
      creditAgg.forEach(({ _id, totalWin }) => {
        creditMap.set(_id, { totalWin });
      });

      // Combine results maps
      const result = games.map((game) => {
        const gameCode = game.game_code;
        const debit = debitMap.get(gameCode) ?? { totalWagered: 0, numberOfBets: 0 };
        const credit = creditMap.get(gameCode) ?? { totalWin: 0 };
        const averageBetAmount =
          debit.numberOfBets > 0 ? debit.totalWagered / debit.numberOfBets : 0;

        return {
          game,
          report: {
            total_wagered: debit.totalWagered,
            total_win: credit.totalWin,
            number_of_bets: debit.numberOfBets,
            average_bet_amount: parseFloat(averageBetAmount.toFixed(2)),
          },
        };
      });

      res.status(200).json({ total, games: result });
      return;
    } catch (error) {
      logger.error(`Error fetching games data: ${error}`);
      res.status(500).json({ success: false, message: "Internal server error" });
      return;
    }
  },
});
