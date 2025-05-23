import "./BlackjackChipButtons.scss";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  addBetTypeAmounts,
  clearBets,
  undoBet,
} from "../../services/blackjack/redux/blackjackSlice";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { entries, values } from "@core/services/utility/Utility";
import { BlackjackButton } from "./BlackjackButton";
import { store } from "#app/store";
import { getWarnBetItems } from "./helpers/getWarnBetItems";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { getRandomChipSound } from "./utils/blackjackSounds";
// import { useTranslation } from "#client/hooks/localization/useTranslation";

export const BlackjackChipButtons = ({}: {}) => {
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const playSound = useSoundPlayer("blackjack");

  const betAmounts = useAppSelector((state) => state.blackjack.betting.betAmounts);
  const history = useAppSelector((state) => state.blackjack.betting.history);
  const hasBets = values(betAmounts).some((amt) => amt > 0);

  const onClear = useCallback(() => {
    playSound(getRandomChipSound());
    dispatch(clearBets());
  }, []);
  const onUndo = useCallback(() => {
    playSound(getRandomChipSound());
    dispatch(undoBet());
  }, []);
  const onRepeat = useCallback(() => {
    playSound(getRandomChipSound());
    const history = store.getState().blackjack.betting.history;
    let items = history[history.length - 1];
    items = getWarnBetItems(items);
    dispatch(addBetTypeAmounts(items));
  }, []);
  const onDouble = useCallback(() => {
    playSound(getRandomChipSound());
    const betAmounts = store.getState().blackjack.betting.betAmounts;
    let items = entries(betAmounts).map(([betType, amount]) => ({
      betType,
      amount,
    }));
    items = getWarnBetItems(items);
    dispatch(addBetTypeAmounts(items));
  }, []);

  return (
    <div className="BlackjackChipButtons">
      <div className="ChipButtons_row">
        <BlackjackButton
          // text={t.gameplay("clear")}
          text={"Clear"}
          icon="clear"
          onClick={onClear}
          enabled={hasBets}
        />

        <BlackjackButton
          // text={t.gameplay("undo")}
          text={"Undo"}
          icon="undo"
          onClick={onUndo}
          enabled={history.length > 0}
        />
      </div>

      <div className="ChipButtons_row">
        <BlackjackButton
          // text={t.gameplay("repeat")}
          text={"Repeat"}
          icon="repeat"
          onClick={onRepeat}
          enabled={history.length > 0}
        />

        <BlackjackButton
          // text={t.gameplay("double")}
          text={"Double"}
          icon="double2"
          onClick={onDouble}
          enabled={hasBets}
        />
      </div>
    </div>
  );
};
