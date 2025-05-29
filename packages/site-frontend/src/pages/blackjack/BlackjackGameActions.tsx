import {
  useCompleted,
  useGame,
  useInsurancePending,
} from "#app/services/blackjack/redux/selectors";
import { Conditional } from "@client/comps/conditional/Conditional";
import BlackjackGameOverActions from "./BlackjackGameOverActions";
import { BlackjackInsuranceActions } from "./BlackjackInsuranceActions";
import BlackjackPlayActions from "./BlackjackPlayActions";
import { Div } from "@client/comps/div/Div";

type Action = "game-play" | "game-complete" | "insurance-pending";

export const BlackjackGameActions = () => {
  const completed = useCompleted();
  const insurancePending = useInsurancePending();

  let action: Action = completed ? "game-complete" : "game-play";
  if (insurancePending) action = "insurance-pending";
  return (
    <Div
      width={"full"}
      justify="center"
      align="center"
      className="BlackjackGameActions"
    >
      <Conditional
        value={action}
        game-play={<BlackjackPlayActions />}
        game-complete={<BlackjackGameOverActions />}
        insurance-pending={<BlackjackInsuranceActions />}
      />
    </Div>
  );
};
