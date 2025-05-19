import "./BlackjackGameControls.scss";
import { useGame } from "#app/services/blackjack/redux/selectors";
import { BlackjackGameActions } from "./BlackjackGameActions";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const BlackjackGameControls = () => {
  const game = useGame();
  const authenticated = useAppSelector((x) => x.user.authenticated);

  if (!authenticated || !game) return null;

  return (
    <div className="BlackjackGameControls">
      <BlackjackGameActions />
    </div>
  );
};
