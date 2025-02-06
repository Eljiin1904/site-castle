import { createSlice } from "@reduxjs/toolkit";
import { ChestDocument, ChestWithCount } from "@core/types/chests/ChestDocument";
import { CaseBattleMode } from "@core/types/case-battles/CaseBattleMode";
import { CaseBattleModifier } from "@core/types/case-battles/CaseBattleModifier";
import { CaseBattles } from "@core/services/case-battles";
import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";

type BattleCreateState = {
  initialized?: boolean;
  chests: ChestWithCount[];
  mode?: CaseBattleMode;
  modifiers: CaseBattleModifier[];
  autoSort: boolean;
  processing?: boolean;
};

type SetChestCount = {
  chest: ChestDocument;
  count: number | undefined;
};

type SetChestOrder = {
  oldIndex: number;
  newIndex: number;
};

const initialState: BattleCreateState = {
  chests: [],
  modifiers: [],
  autoSort: true,
};

export const battleCreateSlice = createSlice({
  name: "battleCreate",
  initialState,
  reducers: ({ reducer }) => ({
    copyBattle: reducer<CaseBattleDocument>((state, { payload }) => {
      state.chests = payload.chests.slice();
      state.mode = payload.mode;
      state.modifiers = payload.modifiers;
    }),
    setChestCount: reducer<SetChestCount>((state, { payload }) => {
      const { chest, count } = payload;
      const chests = state.chests.slice();

      if (!count) {
        chests.splice(
          chests.findIndex((x) => x._id === chest._id),
          1,
        );
      } else {
        const added = chests.find((x) => x._id === chest._id);

        if (added) {
          added.count = count;
        } else {
          chests.push({ ...chest, count });
        }
      }

      if (state.autoSort) {
        chests.sort((a, b) => a.openCost - b.openCost);
      }

      state.chests = chests;
    }),
    setChestOrder: reducer<SetChestOrder>((state, { payload }) => {
      const { oldIndex, newIndex } = payload;
      const chests = state.chests.slice();
      const element = chests[oldIndex];

      chests.splice(oldIndex, 1);
      chests.splice(newIndex, 0, element);

      state.chests = chests;
    }),
    setMode: reducer<CaseBattleMode>((state, { payload }) => {
      const mode = payload;
      const modifiers: CaseBattleModifier[] = [];

      for (const modifier of state.modifiers) {
        const info = CaseBattles.getModifierInfo(modifier);

        if (info.modes.includes(mode)) {
          modifiers.push(modifier);
        }
      }

      state.mode = mode;
      state.modifiers = modifiers;
    }),
    setAutoSort: reducer<boolean>((state, { payload }) => {
      state.autoSort = payload;

      if (state.autoSort) {
        const chests = state.chests.slice();
        chests.sort((a, b) => a.openCost - b.openCost);
        state.chests = chests;
      }
    }),
    addModifier: reducer<CaseBattleModifier>((state, { payload }) => {
      const allMods = CaseBattles.modifiers;
      const modifiers = state.modifiers.slice();

      modifiers.push(payload);
      modifiers.sort((a, b) => allMods.indexOf(a) - allMods.indexOf(b));

      state.modifiers = modifiers;
    }),
    removeModifier: reducer<CaseBattleModifier>((state, { payload }) => {
      const modifiers = state.modifiers.slice();

      modifiers.splice(modifiers.indexOf(payload), 1);

      state.modifiers = modifiers;
    }),
    setCreatorProcessing: reducer<boolean>((state, { payload }) => {
      state.processing = payload;
    }),
    resetCreator: () => initialState,
  }),
});

export const {
  copyBattle,
  setMode,
  setChestCount,
  setChestOrder,
  setAutoSort,
  addModifier,
  removeModifier,
  setCreatorProcessing,
  resetCreator,
} = battleCreateSlice.actions;
