import "./BlackjackPlayActions.scss";
import {
  useAllowedActions,
  useProcessing,
} from "../../services/blackjack/redux/selectors";
import { BlackjackAction } from "#core/types/blackjack/BlackjackAction";
import { useSubmitAction } from "#app/services/blackjack/hooks/useSubmitAction";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BlackjackButton } from "./BlackjackButton";
import { useTranslation } from "#client/hooks/localization/useTranslation";

export default function BlackjackPlayActions() {
  const { t } = useTranslation();
  const allowedActions = useAllowedActions();
  const hasAction = (action: BlackjackAction) =>
    allowedActions.includes(action);
  const processing = useProcessing();
  const submitAction = useSubmitAction();
  const cardsDealt = useAppSelector((state) => state.blackjack.cardsDealt);

  if (!cardsDealt) return null;

  const actionsAr: Exclude<BlackjackAction, "insurance">[][] = [
    ["hit", "stand"],
    ["double", "split"],
  ];

  return (
    <div className="BlackjackPlayActions">
      {actionsAr.map((actions, i) => (
        <div
          key={i}
          className="PlayActions_row"
        >
          {actions.map((action) => (
            <BlackjackButton
              key={action}
              text={t.gameplay(action)}
              icon={action}
              enabled={hasAction(action) && !processing}
              onClick={() => submitAction({ action })}
              className={action}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
