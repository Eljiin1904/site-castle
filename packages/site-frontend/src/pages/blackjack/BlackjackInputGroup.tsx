// import { useTranslation } from "#client/hooks/localization/useTranslation";
import "./BlackjackInputGroup.scss";
import { Div } from "@client/comps/div/Div";
// import "./BlackjackChipPlacements.scss";
import { BlackjackInputPlacement } from "./BlackjackInputPlacement";
import { Button } from "@client/comps/button/Button";
import { useCreateGame } from "#app/services/blackjack/hooks/useCreateGame";
import { useProcessing } from "#app/services/blackjack/redux/selectors";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetInputGroup } from "./BetInputGroup";

export const BlackjackInputGroup = () => {
  // const { t } = useTranslation();
  const layout = useAppSelector((x) => x.style.mainLayout);

  const createGame = useCreateGame();
  const processing = useProcessing();
  const sm = layout === "mobile";
  let i = 0;

  return (
    <Div
      gap={10}
      py={sm ? 12 : 16}
      wrap
      width={"full"}
      justify="center"
      align="center"
      className="input-group"
    >
      <Div
        align="center"
        justify="center"
        width={sm ? "full" : 256}
        gap={8}
        className="input-1"
      >
        <Div width={128}>
          <BlackjackInputPlacement
            index={i++}
            betType="perfect-pairs"
            title={"Perfect Pairs"}
            size="large"
          />
        </Div>
        <Div width={128}>
          <BlackjackInputPlacement
            index={i++}
            betType="21+3"
            title={"21 + 3"}
            size="large"
          />
        </Div>
      </Div>
      <Div
        align="center"
        justify="center"
        width={160}
        className="input-2"
      >
        <BetInputGroup
          betType="main-bet"
          title="Main Bet"
        />
      </Div>
      <Div
        align="center"
        justify="center"
        width={sm ? "full" : 256}
        gap={8}
        className="input-3"
      >
        <Div width={128}>
          <BlackjackInputPlacement
            index={i++}
            betType="lucky-ladies"
            title={"Lucky Ladies"}
            size="large"
          />
        </Div>

        <Div width={128}>
          <BlackjackInputPlacement
            index={i++}
            betType="blackjack-15x"
            title={"Blackjack"}
            size="large"
          />
        </Div>
      </Div>
      <Div
        mt={20}
        width={"full"}
        justify={"center"}
        align={"center"}
        className="input-4"
      >
        <Button
          type="submit"
          kind="secondary"
          size="sm"
          label="Place Bet"
          disabled={processing}
          fx
          onClick={createGame}
        />
      </Div>
    </Div>
  );
};
