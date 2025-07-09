import { Div } from "@client/comps/div/Div";
import { useGame } from "#app/services/blackjack/redux/selectors";
import { BlackjackInputGroup } from "./BlackjackInputGroup";

export const BlackjackFooter = () => {

  const game = useGame();

  return (
    <Div
      fx
      zIndex={1}
      wrap
      width={"full"}
    >
      <Div
        alignItems="center"
        justifyContent="center"
      >
        {!game && <BlackjackInputGroup />}
      </Div>
    </Div>
  );
};
