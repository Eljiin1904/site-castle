import "./BlackjackChipActions.scss";
import { useCreateGame } from "#app/services/blackjack/hooks/useCreateGame";
import { useProcessing } from "#app/services/blackjack/redux/selectors";
import { BlackjackButtonOrange } from "./BlackjackButtonOrange";
import { BlackjackChipButtons } from "./BlackjackChipButtons";
import { BlackjackChipOptions } from "./BlackjackChipOptions";
import { useTranslation } from "#client/hooks/localization/useTranslation";

export const BlackjackChipActions = ({}: {}) => {
  const { t } = useTranslation();
  const createGame = useCreateGame();
  const processing = useProcessing();

  return (
    <div className="BlackjackChipActions">
      <BlackjackChipButtons />
      <BlackjackChipOptions />
      <BlackjackButtonOrange
        text={t.gameplay("play")}
        onClick={createGame}
        disabled={processing}
      />
    </div>
  );
};
