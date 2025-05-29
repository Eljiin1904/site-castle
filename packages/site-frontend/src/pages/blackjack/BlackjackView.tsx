import "./BlackjackView.scss";
import { useEffect } from "react";
import { useInit } from "../../services/blackjack/redux/selectors";
import { triggerCheckExisting } from "../../services/blackjack/redux/blackjackSlice";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BlackjackGameCanvas } from "./BlackjackGameCanvas";
import { BlackjackLayout } from "./BlackjackLayout";
import classNames from "classnames";
import { useGetExistingGame } from "#app/services/blackjack/hooks/useGetExistingGame";

export const BlackjackView = ({}: {}) => {
  const { checkExisting, loading } = useInit();
  const darkTheme = useAppSelector((x) => x.blackjack.darkTheme);
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const getExistingGame = useGetExistingGame();

  // all this to avoid double mount from dev mode
  // TODO: move to socket & refactor
  // TODO or do anything else with this
  useEffect(() => {
    if (authenticated && !checkExisting) triggerCheckExisting();
    else if (authenticated && checkExisting && !loading) getExistingGame();
  }, [checkExisting, loading, authenticated, getExistingGame]);

  // TODO use unusable betting screen instead
  if (loading) return null;

  const className = classNames("BlackjackView", darkTheme ? "dark" : "");

  return (
    <div className={className}>
      <div className="View_inner">
        <BlackjackLayout />

        <BlackjackGameCanvas />
      </div>
    </div>
  );
};

// TODO: replace with unusable betting page
// function Loading() {
//   return (
//     <div
//       className="Loading"
//       style={{ position: "absolute", top: "50%", left: "50%" }}
//     >
//       {/* Loading... */}
//     </div>
//   );
// }
