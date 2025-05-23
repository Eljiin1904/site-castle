import {
  useCompleted,
  useGame,
  useInsurancePending,
} from "#app/services/blackjack/redux/selectors";
import { Conditional } from "@client/comps/conditional/Conditional";
import BlackjackGameOverActions from "./BlackjackGameOverActions";
import { BlackjackInsuranceActions } from "./BlackjackInsuranceActions";
import BlackjackPlayActions from "./BlackjackPlayActions";

type Action = "game-play" | "game-complete" | "insurance-pending";

export const BlackjackGameActions = () => {
  const completed = useCompleted();
  const insurancePending = useInsurancePending();

  let action: Action = completed ? "game-complete" : "game-play";
  if (insurancePending) action = "insurance-pending";

  return (
    <div className="BlackjackGameActions">
      <Conditional
        value={action}
        game-play={<BlackjackPlayActions />}
        game-complete={<BlackjackGameOverActions />}
        insurance-pending={<BlackjackInsuranceActions />}
      />
    </div>
  );
};
