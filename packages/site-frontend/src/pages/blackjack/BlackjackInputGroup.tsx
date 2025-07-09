import "./BlackjackInputGroup.scss";
import { Div } from "@client/comps/div/Div";
// import "./BlackjackChipPlacements.scss";
import { BlackjackInputPlacement } from "./BlackjackInputPlacement";
import { Button } from "@client/comps/button/Button";
import { useCreateGame } from "#app/services/blackjack/hooks/useCreateGame";
import { useProcessing } from "#app/services/blackjack/redux/selectors";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetInputGroup } from "./BetInputGroup";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { DemoNotice } from "#app/comps/demo/DemoNotice";

export const BlackjackInputGroup = () => {
  
  const layout = useAppSelector((x) => x.style.mainLayout);
  const {t} = useTranslation('games//blackjack');
  const bets = useAppSelector((x) => x.blackjack.betting.betAmounts);
  const createGame = useCreateGame();
  const processing = useProcessing();
  const betAmount = bets['main-bet'] + bets["21+3"] + bets["perfect-pairs"] + bets["lucky-ladies"] + bets["blackjack-15x"];
  const sm = layout === "mobile";
  const md = layout === "tablet";
  let i = 0;
  const label = betAmount > 0 ? t('placeBet') : t('games:playDemo');
  return (
    <Div
      gap={sm ? 4 : 20}
      p={sm ? 12 : 16}
      wrap
      justify="center"
      align="center"
      borderColor={"brown-4"}
      border
      borderWidth={1}
      className="input-group"
      bg="black-overlay"
    >
      <Div
        align="center"
        justify="center"
        width={sm || md ? "full" : 280}
        gap={8}
        className="input-1"
      >
        <Div width={140}>
          <BlackjackInputPlacement
            index={i++}
            betType="perfect-pairs"
            title={t('inputs.perfectPairs')}
            size="large"
          />
        </Div>
        <Div width={140}>
          <BlackjackInputPlacement
            index={i++}
            betType="21+3"
            title={t('inputs.21Plus3')}
            size="large"
          />
        </Div>
      </Div>
      <Div
        align="center"
        justify="center"
        width={sm || md ? 280 : 200}
        className="input-2"
      >
        <BetInputGroup
          betType="main-bet"
          title={t('inputs.mainBet')}
        />
      </Div>
      <Div
        align="center"
        justify="center"
        width={sm || md ? "full" : 280}
        gap={8}
        className="input-3"
      >
        <Div width={140}>
          <BlackjackInputPlacement
            index={i++}
            betType="lucky-ladies"
            title={t('inputs.luckyLadies')}
            size="large"
          />
        </Div>

        <Div width={140}>
          <BlackjackInputPlacement
            index={i++}
            betType="blackjack-15x"
            title={t('inputs.blackjack')}
            size="large"
          />
        </Div>
      </Div>
      <Div
        mt={5}
        width={"full"}
        justify={"center"}
        align={"center"}
        className="input-4"
        column
        gap={8}
      >
        <Button
          type="submit"
          kind="primary-green"
          size="sm"
          label={label}
          disabled={processing}
          fx
          onClick={createGame}
        />
        {betAmount === 0 && <DemoNotice />}
      </Div>
    </Div>
  );
};
