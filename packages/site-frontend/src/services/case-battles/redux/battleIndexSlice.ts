import { createSlice } from "@reduxjs/toolkit";
import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";
import { StreamUpdate } from "@core/types/database/DatabaseStreamEvent";
import { Database } from "@core/services/database";

type BattleIndexState = {
  initialized?: boolean;
  battles: CaseBattleDocument[];
  limit: number;
  count: number;
  value: number;
  processing?: boolean;
};

type IndexStats = {
  count: number;
  value: number;
};

const initialState: BattleIndexState = {
  battles: [],
  limit: 25,
  count: 0,
  value: 0,
};

export const battleIndexSlice = createSlice({
  name: "battleIndex",
  initialState,
  reducers: ({ reducer }) => ({
    initIndex: reducer<CaseBattleDocument[]>((state, { payload }) => {
      state.battles = payload;
      state.initialized = true;
    }),
    insertIndex: reducer<CaseBattleDocument>((state, { payload }) => {
      const battles = state.battles.slice();

      battles.unshift(payload);

      if (battles.length > state.limit) {
        battles.pop();
      }

      state.battles = battles;
    }),
    updateIndex: reducer<StreamUpdate>((state, { payload }) => {
      const update = payload;
      const battle = state.battles.find((x) => x._id === update.documentId);

      if (battle) {
        Database.updateDocument({
          document: battle,
          updatedFields: update.updatedFields,
          removedFields: update.removedFields,
        });
      }
    }),
    setIndexLimit: reducer<number>((state, { payload }) => {
      state.limit = payload;
    }),
    setIndexStats: reducer<IndexStats>((state, { payload }) => {
      state.count = payload.count;
      state.value = payload.value;
    }),
    setIndexProcessing: reducer<boolean>((state, { payload }) => {
      state.processing = payload;
    }),
    resetIndex: () => initialState,
  }),
});

export const {
  initIndex,
  insertIndex,
  updateIndex,
  setIndexLimit,
  setIndexStats,
  setIndexProcessing,
  resetIndex,
} = battleIndexSlice.actions;
