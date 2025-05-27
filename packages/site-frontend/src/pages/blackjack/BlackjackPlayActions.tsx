import "./BlackjackPlayActions.scss";
import { useAllowedActions, useProcessing } from "../../services/blackjack/redux/selectors";
import { BlackjackAction } from "@core/types/blackjack/BlackjackAction";
import { useSubmitAction } from "#app/services/blackjack/hooks/useSubmitAction";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BlackjackButton } from "./BlackjackButton";
// import { useTranslation } from "#client/hooks/localization/useTranslation";
import { Div } from "@client/comps/div/Div";

export default function BlackjackPlayActions() {
  // const { t } = useTranslation();
  const layout = useAppSelector((x) => x.style.mainLayout);

  const allowedActions = useAllowedActions();
  const hasAction = (action: BlackjackAction) => allowedActions.includes(action);
  const processing = useProcessing();
  const submitAction = useSubmitAction();
  const cardsDealt = useAppSelector((state) => state.blackjack.cardsDealt);
  const sm = layout === "mobile";

  if (!cardsDealt) return null;

  const actionsAr: Exclude<BlackjackAction, "insurance">[][] = [
    ["split", "hit"],
    ["stand", "double"],
  ];

  return (
    <Div
      fx
      width={"full"}
      align="center"
      justify="center"
      px={sm ? 20 : 24}
      py={sm ? 16 : 24}
      gap={sm ? 8 : 12}
      bg="brown-6"
    >
      <div className="BlackjackPlayActions">
        {actionsAr.map((actions, i) => (
          <div
            key={i}
            className="PlayActions_row"
          >
            {actions.map((action) => (
              <BlackjackButton
                key={action}
                text={action}
                icon={action}
                enabled={hasAction(action) && !processing}
                onClick={() => submitAction({ action })}
                className={action}
              />
            ))}
          </div>
        ))}
      </div>
    </Div>
  );
}
