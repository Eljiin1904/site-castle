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
      bg="black-overlay"
    >
      <Div
        flexFlow={sm ? "column" : "row"}
        gap={10}
      >
        {actionsAr.map((actions, i) => (
          <Div
            key={i}
            gap={10}
          >
            {actions.map((action, i) => (
              <Div
                key={i}
                width={sm ? 128 : 160}
              >
                <BlackjackButton
                  key={action}
                  text={action}
                  icon={action}
                  enabled={hasAction(action) && !processing}
                  onClick={() => submitAction({ action })}
                  className={action}
                />
              </Div>
            ))}
          </Div>
        ))}
      </Div>
    </Div>
  );
}
