import "./BlackjackGameCanvas.scss";
import { useWorld } from "../../services/blackjack/redux/selectors";
import { useEffect } from "react";

export const BlackjackGameCanvas = ({}: {}) => {
  const world = useWorld();

  // skipping authenticated prop here because world can draw regardless

  useEffect(() => {
    const e = document.getElementById("blackjack-game");
    if (!e) throw new Error("No element with id 'blackjack-game'");
    world.draw(e);
  }, [world]); // currently doesn't change

  return (
    <div className="BlackjackGameCanvas">
      <div id="blackjack-game" />
    </div>
  );
};
