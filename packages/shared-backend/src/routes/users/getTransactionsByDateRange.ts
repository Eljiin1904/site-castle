import { Filter } from "mongodb";
import { subDays, subMonths, differenceInDays, differenceInMonths, addDays, addMonths, addYears } from "date-fns";
import { Validation } from "@core/services/validation";
import { Transactions } from "@core/services/transactions";
import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

/**
 * Get the correct transaction value based on the type of chart. Right now we only have 2 charts
 * - wagered and pnl. Wagered is the total amount wagered in a transaction and pnl is the profit/loss
 * @param transaction The transaction document
 * @param type The type of chart. Wagered or pnl
 * @returns The value of the transaction based on the type of chart
 */
const transactionValue = (transaction: TransactionDocument, type: "pnl" | "wagered") => {
  switch (type) {
    case "pnl":
      return transaction.stats?.wagerProfitLoss ?? 0;
    case "wagered":
      return transaction.stats?.wagerAmount ?? 0;
    default:
      return 0;
  }
};
/**
 * Get the values by time frame. This function will return the values based on the time frame selected.
 * The time frame can be daily, weekly, monthly, quarterly, yearly or multi-year.
 * Function calculate the diff in days and based on that will check the possible ranges:
 * time frame 0 - no data
 * time frame 1 - group transactions for every 3 hours
 * time frame less than 7 - group transactions for every day
 * time frame less than 90 - group transactions for every 3, 5 or 15 days
 * time frame less than 182 - group transactions for every month
 * time frame less than 365 - group transactions for every 3 months
 * time frame more than 365 - group transactions for every year
 * @param transactions 
 * @param minDate 
 * @param maxDate 
 * @param type 
 * @returns 
 */
const getValuesByTimeFrame = (
  transactions: TransactionDocument[],
  minDate: Date,
  maxDate: Date,
 
  type: "pnl" | "wagered",
  ) => {

    const rangeInDays = differenceInDays(maxDate, minDate);
    let total = 0;
    const values: {label: string, value: number}[] = [];
    minDate.setHours(0, 0, 0, 0);
    maxDate.setHours(23, 59, 59, 999);

    if (rangeInDays < 0) {
      return {total: 0, values: []};
    }
    else if(rangeInDays === 0) {
      for(let i = 0; i < 24; i+=3) {

        const hour = i%12 === 0 ? 12 : (i%12 < 10 ? `0${i%12}` : i%12);
        const ampm = i < 12 ? "AM" : "PM";
        const label = `${hour} ${ampm}`;          
        values.push({ label: label, value: 0 });
      }
      transactions.forEach((transaction) => {
        const date = new Date(transaction.timestamp);
        const dateHour = date.getHours();
        const chartTime = dateHour % 3 === 0 ? dateHour : dateHour  - (dateHour % 3);
        const ampm = chartTime < 12 ? "AM" : "PM";
        const hour = chartTime % 12 === 0 ? 12 : (chartTime % 12 < 10 ? `0${chartTime % 12}` : chartTime % 12);
        const hourLabel = `${hour} ${ampm}`;
        const value = transactionValue(transaction, type);
        total += value;
        const existing = values.find((v) => v.label === hourLabel);
        if (existing) {
          existing.value += value;
        } else {
          values.push({ label: hourLabel, value });
        }
      });
      return {total: total, values};
    }
    else if(rangeInDays < 7) {
      let weekStars = minDate;
      while(weekStars <= maxDate) {
        const dayOfWeek = weekStars.toLocaleDateString('en-US', { weekday: 'short' });
        values.push({ label: dayOfWeek, value: 0 });
        weekStars = addDays(weekStars, 1);
      }

      transactions.forEach((transaction) => {
        const date = new Date(transaction.timestamp);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });
        const value = transactionValue(transaction, type);
        total += value;
        const existing = values.find((v) => v.label === day);
        if (existing) {
          existing.value += value;
        } else {
          values.push({ label: day, value });
        }
      });
    }
    else if(rangeInDays <= 90) {
      
      let step = rangeInDays <= 21 ? 3 :( rangeInDays <= 35 ? 5 : 15);
      let monthStart = minDate;
      while(monthStart <= maxDate) {
        const label = monthStart.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
        values.push({ label: label, value: 0 });    
        monthStart = addDays(monthStart, step);
      }
      transactions.forEach((transaction) => {
        const diffInDays = differenceInDays(transaction.timestamp, minDate) % step;
        const closestLabelDate = subDays(transaction.timestamp, diffInDays);
        const day = closestLabelDate.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
        const value = transactionValue(transaction, type);
        total += value;
        const existing = values.find((v) => v.label === day);
        if (existing) {
          existing.value += value;
        } else {
          values.push({ label: day, value });
        }
      });
    } 
    else if(rangeInDays <= 182) {
      //quarterly range
      let monthStart = minDate;
      while(monthStart <= maxDate) {

        const label = monthStart.toLocaleDateString("en-US", { month: "short" , year: "2-digit"});
        values.push({ label: label, value: 0 });
        monthStart = addMonths(monthStart, 1);
      }
      transactions.forEach((transaction) => {
        const date = new Date(transaction.timestamp);
        const label = date.toLocaleDateString("en-US", { month: "short" , year: "2-digit"}).trim();
        const value = transactionValue(transaction, type);
        total += value;
        const existing = values.find((v) => v.label === label);          
        if (existing) {
          existing.value += value;
        } else {
          values.push({ label: label, value });
        }
      });
    }
    else if(rangeInDays <= 365) {
      //yearly range
      const step = 3;
      let monthStart = minDate;
      while(monthStart <= maxDate) {
        const label = monthStart.toLocaleDateString("en-US", { month: "short" , year: "2-digit"});
        values.push({ label: label, value: 0 });
        monthStart = addMonths(monthStart, 3);
      }
      transactions.forEach((transaction) => {
        const diffInMonths = differenceInMonths(transaction.timestamp, minDate) % step;
        const closestLabelDate = subMonths(transaction.timestamp, diffInMonths);
        const label = closestLabelDate.toLocaleDateString("en-US", { month: "short" , year: "2-digit"});
        const value = transactionValue(transaction, type);
        total += value;
        const existing = values.find((v) => v.label === label);
        if (existing) {
          existing.value += value;
        } else {
          values.push({ label: label, value });
        }
      });
    }
    else {
      //multi-year range
      let yearStart = minDate;
      while(yearStart <= maxDate) {
        const label = yearStart.toLocaleDateString("en-US", { year: "numeric"});
        values.push({ label: label, value: 0 });
        yearStart = addYears(yearStart, 1);
      }
      transactions.forEach((transaction) => {
        const date = new Date(transaction.timestamp);
        const label = date.toLocaleDateString("en-US", { year: "numeric"});
        const value = transactionValue(transaction, type);
        total += value;
        const existing = values.find((v) => v.label === label);
        if (existing) {
          existing.value += value;
        } else {
          values.push({ label: label, value });
        }
      });
    }

    return {total: total, values: values};
};

/**
 * Endpoint to get the transactions by date range.
 * @param minDate The minimum date to get the transactions from
 * @param maxDate The maximum date to get the transactions from
 * @param category The category of the transaction. This is optional and can be used to filter the transactions by game
 * @param type The type of transaction. This can be either wagered or pnl. This is required and will be used to filter the transactions
 * @returns An array of {label, value} objects where label is the date and value is the total amount wagered or profit/loss for that date.
 */
export default Http.createApiRoute({
  type: "post",
  path: "/get-transactions-by-date-range",
  secure: true,
  body: Validation.object({
    minDate: Validation.date().required(),
    maxDate: Validation.date().required(),
    category: Validation.string().oneOf(Transactions.gameCategories, "invalid_game"),
    type: Validation.string().oneOf(["pnl", "wagered"], "invalid_type").required(),
  }),
  callback: async (req, res) => {
    const { minDate, maxDate , category, type} = req.body;
    const userId = req.user._id;

    const filter: Filter<TransactionDocument> = {
      "user.id": userId,
    };
    filter.tags = { $eq: type === "pnl" ? "game": "bet" };
    if (category) {
      filter.category = category;
    }
    filter.timestamp = {
      $gte: minDate || new Date(0),
      $lte: maxDate || new Date(),
    };
    
    const transactions = await Database.collection("transactions")
      .find(filter, {
        sort: { timestamp: 1 },
        projection: { bet: 0 },
      })
      .toArray();
      
    const chartPoints = getValuesByTimeFrame(transactions, minDate, maxDate, type);
    res.json(chartPoints);
  },
});
