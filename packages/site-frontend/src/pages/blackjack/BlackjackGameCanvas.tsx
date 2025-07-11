import "./BlackjackGameCanvas.scss";
import { useWorld } from "../../services/blackjack/redux/selectors";
import { useEffect } from "react";
import { BlackjackHeader } from "./BlackjackHeader";
import { Div } from "@client/comps/div/Div";
import { BlackjackFooter } from "./BlackjackFooter";
import { BlackjackGameControls } from "./BlackjackGameControls";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const BlackjackGameCanvas = () => {
  const world = useWorld();
  const {t} = useTranslation();
  // skipping authenticated prop here because world can draw regardless

  useEffect(() => {
    const e = document.getElementById("blackjack-game");
    if (!e) throw new Error(t("validations:errors.games.blackjack.noElementId"));
    world.draw(e);
  }, [world]); // currently doesn't change

  return (
    <div className="BlackjackGameCanvas">
      <Div
        mt={20}
        pr={20}
        zIndex={12}
      >
        <BlackjackHeader />
      </Div>
      <Div
        justify="center"
        align="center"
        className="control"
        zIndex={10}
      >
        <BlackjackFooter />
      </Div>
      <Div
        justify="center"
        align="center"
        className="control"
        zIndex={10}
      >
        <BlackjackGameControls />
      </Div>
      <div id="blackjack-game" />
    </div>
  );
};
