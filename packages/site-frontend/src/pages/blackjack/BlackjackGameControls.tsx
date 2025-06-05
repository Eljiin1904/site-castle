import "./BlackjackGameControls.scss";
import { useGame } from "#app/services/blackjack/redux/selectors";
import { BlackjackGameActions } from "./BlackjackGameActions";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";

export const BlackjackGameControls = () => {
  const game = useGame();
  const authenticated = useAppSelector((x) => x.user.authenticated);
  if (!authenticated || !game) return null;

  return (
    <Div
      fx
      grow
      align="center"
      justify="center"
      className="BlackjackGameControls"
      borderColor={"brown-4"}
      border
      borderWidth={1}
    >
      <BlackjackGameActions />
    </Div>
  );
};
