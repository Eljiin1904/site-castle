import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./BlackjackBetting.scss";
import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useGame, useWorld } from "#app/services/blackjack/redux/selectors";
import { BlackjackChipActions } from "./BlackjackChipActions";
import { BlackjackChipPlacements } from "./BlackjackChipPlacements";
import { BlackjackMobileShelf } from "./BlackjackMobileShelf";
import { BlackjackBetTotals } from "./BlackjackBetTotals";

export const BlackjackBetting = ({}: {}) => {
  const getExistingResponded = useAppSelector((state) => state.blackjack.getExistingResponded);
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const game = useGame();
  const world = useWorld();
  const [shelfOpen, setShelfOpen] = useState(false);

  const toggleShelf = useCallback(() => {
    setShelfOpen(!shelfOpen);
  }, [setShelfOpen, shelfOpen]);

  // doing something similar to this on BlackjackManager with authenticatd
  // should be merged into that
  useEffect(() => {
    if (!game) world.clear();
  }, [game, world]);

  // using && authenticated to avoid a bigger change
  if (!getExistingResponded && authenticated) return null;

  const className = classNames(
    "BlackjackBetting",
    game ? "game-started" : "game-not-started",
    shelfOpen ? "shelf-open" : "shelf-closed",
  );

  return (
    <div className={className}>
      <BlackjackBetTotals />
      <BlackjackMobileShelf toggleShelf={toggleShelf} />
      <BlackjackChipPlacements />
      <BlackjackChipActions />
    </div>
  );
};
