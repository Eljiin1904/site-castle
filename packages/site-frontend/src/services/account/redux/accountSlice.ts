import { createSlice } from "@reduxjs/toolkit";
import {subDays} from "date-fns";
import { DateRangeType } from "@core/services/transactions/Transactions";
import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { Users } from "@core/services/users";

interface AccountState {

  userStatsType: "wagered" | "pnl";
  userStatsDateRange: DateRangeType;
  userStatsCategory: TransactionCategory |undefined;
  userStatsMinDate: Date;
  userStatsMaxDate: Date;
}

const initialState: AccountState = {
  userStatsType: "wagered",
  userStatsDateRange: "thisMonth",
  userStatsCategory: undefined,
  userStatsMinDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
  userStatsMaxDate: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: ({ reducer }) => ({
    setUserStatsType: reducer<"wagered" | "pnl">((state, { payload }) => {
      state.userStatsType = payload;
    }),
    
    setUserStatsDateRange: reducer<DateRangeType>((state, { payload }) => {
      state.userStatsDateRange = payload;
      switch (payload) {
        case "today":
          state.userStatsMinDate = new Date(new Date().setHours(0, 0, 0, 0));
          state.userStatsMaxDate = new Date(new Date().setHours(23, 59, 59, 999));
          break;
        case "yesterday":
          state.userStatsMinDate = new Date(new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000);
          state.userStatsMaxDate = new Date(new Date().setHours(23, 59, 59, 999) - 24 * 60 * 60 * 1000);
          break;
        case "last7Days":
          state.userStatsMinDate = subDays(new Date(), 6);
          state.userStatsMaxDate = new Date();
          break;
        case "thisMonth":
          state.userStatsMinDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
          state.userStatsMaxDate = new Date();
          break;
        case "lastMonth":
          state.userStatsMinDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
          state.userStatsMaxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
          break;
        case "last3Months":
          state.userStatsMinDate = new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1);
          state.userStatsMaxDate = new Date();
          break;
        case "last6Months":
          state.userStatsMinDate = new Date(new Date().getFullYear(), new Date().getMonth() - 5, 1);
          state.userStatsMaxDate = new Date();
          break;
        case "thisYear":
          state.userStatsMinDate = new Date(new Date().getFullYear(), 0, 1);
          state.userStatsMaxDate = new Date();
          break;
        case "lastYear":
          state.userStatsMinDate = new Date(new Date().getFullYear() - 1, 0, 1); 
          state.userStatsMaxDate = new Date(new Date().getFullYear(), 0, 0);
          break;
      }
    }),
    setUserStatsCategory: reducer<TransactionCategory | undefined>((state, { payload }) => {
      state.userStatsCategory = payload;
    }),
    setUserStatsMinDate: reducer<Date>((state, { payload }) => {
      state.userStatsMinDate = payload;
    }),
    setUserStatsMaxDate: reducer<Date>((state, { payload }) => {
      state.userStatsMaxDate = payload;
    })
  }),
});

export const {
  setUserStatsType,
  setUserStatsDateRange,
  setUserStatsCategory,
  setUserStatsMinDate,
  setUserStatsMaxDate
} = accountSlice.actions;
