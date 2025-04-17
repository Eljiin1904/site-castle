import { Filter } from "mongodb";
import { Validation } from "@core/services/validation";
import { Transactions } from "@core/services/transactions";
import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-transactions-by-date-range",
  secure: true,
  body: Validation.object({
    dateRange: Validation.string().optional(),
    category: Validation.string().oneOf(Transactions.gameCategories, "invalid_game"),
    type: Validation.string().optional(),
  }),
  callback: async (req, res) => {
    const { dateRange , category, type} = req.body;
    const userId = req.user._id;

    const filter: Filter<TransactionDocument> = {
      "user.id": userId,
    };
    filter.tags = { $eq: type === "pnl" ? "game": "bet" };
    if (category) {
      filter.category = category;
    }
   
    if (dateRange) {
      var minDate: Date | undefined;
      var maxDate: Date | undefined;
      switch (dateRange) {
        case "today":
          minDate = new Date(new Date().setHours(0, 0, 0, 0));
          maxDate = new Date(new Date().setHours(23, 59, 59, 999));
          break;
        case "yesterday":
          minDate = new Date(new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000);
          maxDate = new Date(new Date().setHours(23, 59, 59, 999) - 24 * 60 * 60 * 1000);
          break;
        case "last7Days":
          minDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          maxDate = new Date();
          break;
        case "thisMonth":
          minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
          maxDate = new Date();
          break;
        case "lastMonth":
          minDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1); 
          maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
          break;
        case "last3Months":
          minDate = new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1);
          maxDate = new Date();
          break;
        case "last6Months":
          minDate = new Date(new Date().getFullYear(), new Date().getMonth() - 5, 1);
          maxDate = new Date();
          break;
        case "thisYear":
          minDate = new Date(new Date().getFullYear(), 0, 1);
          maxDate = new Date();
          break;
        case "lastYear":
          minDate = new Date(new Date().getFullYear() - 1, 0, 1);
          maxDate = new Date(new Date().getFullYear(), 0, 0);
          break;
      }
      if (minDate || maxDate) {
        filter.timestamp = {
          $gte: minDate || new Date(0),
          $lte: maxDate || new Date(),
        };
      }
    }
    
    const transactions = await Database.collection("transactions")
      .find(filter, {
        sort: { timestamp: 1 },
        projection: { bet: 0 },
      })
      .toArray();

    const values: {label: string, value: number}[] = [];
    let total = 0;
    switch (dateRange) {
      case "today":
      case "yesterday":
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
          const value = type === 'pnl' ? transaction.amount : transaction.stats?.wagerAmount ?? 0;
          total += value;
          const existing = values.find((v) => v.label === hourLabel);
          if (existing) {
            existing.value += value;
          } else {
            values.push({ label: hourLabel, value });
          }
        });
        break;
      case "last7Days":
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
          values.push({ label: dayOfWeek, value: 0 });
        }       
        transactions.forEach((transaction) => {
          const date = new Date(transaction.timestamp);
          const day = date.toLocaleDateString("en-US", { weekday: "long" });
          const value = type === 'pnl' ? transaction.amount : transaction.stats?.wagerAmount ?? 0;
          total += value;
          const existing = values.find((v) => v.label === day);
          if (existing) {
            existing.value += value;
          } else {
            values.push({ label: day, value });
          }
        });
        break;
      case "thisMonth":        
      case "lastMonth":
        const monthDate =  dateRange === "thisMonth" ? new Date() : new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
        const monthLastDay = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
        for (let i = 1; i <= monthLastDay; i+=5) {
          const day = i % 5 === 0 ? i : i  - (i % 5);
          const labelMonth = monthDate.toLocaleDateString("en-US", { month: "long" });
          const label = `${labelMonth} ${day === 0 ? 1 : day}`;
          values.push({ label: label, value: 0 });
        }
        transactions.forEach((transaction) => {
          const date = new Date(transaction.timestamp);
          const monthDay = date.getDate();
          const labelDay = monthDay % 5 === 0 ? monthDay : monthDay  - (monthDay % 5);
          const labelMonth = date.toLocaleDateString("en-US", { month: "long" });
          const label = `${labelMonth} ${labelDay === 0 ? 1 : labelDay}`;
         
          const value = type === 'pnl' ? transaction.amount : transaction.stats?.wagerAmount ?? 0;
          total += value;
          const existing = values.find((v) => v.label === label);
          if (existing) {
            existing.value += value;
          } else {
            values.push({ label: label, value });
          }
        });
        break;
      case "last3Months":
      case "last6Months":
        const dateRangeMonths = dateRange === "last3Months" ? 2 : 5;
        const dateRangeStart = new Date();
        for (let i = dateRangeMonths; i >=0 ; i--) {
          const month = new Date(dateRangeStart.getFullYear(), dateRangeStart.getMonth() - i, 1);
          const monthLabel = month.toLocaleDateString("en-US", { month: "short" });
          const yearLabel = month.toLocaleDateString("en-US", { year: "2-digit" });
          const label = `${monthLabel} ${yearLabel}`;
          values.push({ label: label, value: 0 });
        }
        transactions.forEach((transaction) => {
          const date = new Date(transaction.timestamp);
          const label = date.toLocaleDateString("en-US", { month: "short" , year: "2-digit"}).trim();
          const value = type === 'pnl' ? transaction.amount : transaction.stats?.wagerAmount ?? 0;
          total += value;
          const existing = values.find((v) => v.label === label);          
          if (existing) {
            existing.value += value;
          } else {
            values.push({ label: label, value });
          }
        });
        break;
      case "thisYear":
      case "lastYear":
        const dateYear = dateRange === "thisYear" ? new Date() : new Date(new Date().getFullYear() - 1, 0, 1);
        const yearLabel = dateYear.toLocaleDateString("en-US", { year: "2-digit" });
        const currentMonth = dateYear.getMonth();
        for (let i = 0; i < 12; i+=1) {
          const month = i + 1;
          const monthLabel = new Date(0, month - 1).toLocaleDateString("en-US", {month: "short"});
          values.push({ label: `${monthLabel} ${yearLabel}`, value: 0 });
          if(currentMonth === month && dateRange === "thisYear") break;
        }
        transactions.forEach((transaction) => {
          const date = new Date(transaction.timestamp);
          const label = date.toLocaleDateString("en-US", {month: "short", year: "2-digit"});
          const value = type === 'pnl' ? transaction.amount : transaction.stats?.wagerAmount ?? 0;
          total += value;
          const existing = values.find((v) => v.label === label);
          if (existing) {
            existing.value += value;
          } else {
            values.push({ label: label, value });
          }
        });
        break;
    }
    res.json({ values, total });
  },
});
