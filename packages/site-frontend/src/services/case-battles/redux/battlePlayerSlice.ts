import { createSlice } from "@reduxjs/toolkit";
import { Database } from "@core/services/database";
import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { StreamUpdate } from "@core/types/database/DatabaseStreamEvent";

type BattlePlayerState = CaseBattleDocument & {
  initialized?: boolean;
  animate?: boolean;
  processing?: boolean;
  chestByRound: ChestDocument[];
};

const initialState = {} as BattlePlayerState;

export const battlePlayerSlice = createSlice({
  name: "battlePlayer",
  initialState,
  reducers: ({ reducer }) => ({
    initPlayer: reducer<CaseBattleDocument>((state, { payload }) => {
      const battle = payload;

      const chestByRound = [];

      for (const chest of battle.chests) {
        for (let i = 0; i < chest.count; i++) {
          chestByRound.push(chest);
        }
      }

      let animate;

      if (battle.status === "completed") {
        animate = false;
      } else if (battle.status === "simulating") {
        animate = false;
      }

      return {
        ...battle,
        initialized: true,
        animate,
        chestByRound,
      };
    }),
    updatePlayer: reducer<StreamUpdate>((state, { payload }) => {
      Database.updateDocument({
        document: state,
        updatedFields: payload,
        removedFields: [],
      });

      state.animate = true;
    }),
    setPlayerProcessing: reducer<boolean>((state, { payload }) => {
      state.processing = payload;
    }),
    resetPlayer: () => initialState,
  }),
});

export const { initPlayer, updatePlayer, setPlayerProcessing, resetPlayer } =
  battlePlayerSlice.actions;
