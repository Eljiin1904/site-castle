import { Fragment } from "react";
import { Numbers } from "@core/services/numbers";
import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalField } from "@client/comps/modal/ModalField";
import { Mines } from "#app/services/mines";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { MineCountSlider } from "./MineCountSlider";
import { MinesGridSizeSelector } from "./MinesGridSizeSelector";
import { BetInputGroup } from "./BetInputGroup";
import { useCashout } from "./useCashout";
import { useManualBet } from "./useManualBet";
import { usePlaying } from "./usePlaying";
import { useTranslation } from "@core/services/internationalization/internationalization";
import classNames from "classnames";
import { DemoNotice } from "#app/comps/demo/DemoNotice";

export const MinesMenuManual = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Conditional
      value={layout}
      mobile={<MobileContent />}
      tablet={<NotMobileContent />}
      laptop={<NotMobileContent />}
      desktop={<NotMobileContent />}
    />
  );
};

const MobileContent = () => {
  return (
    <Fragment>
      <RandomButton />
      <ActionButton />
      <GameStateView />
      <BaseFields />
    </Fragment>
  );
};

const NotMobileContent = () => {
  return (
    <Fragment>
      <BaseFields />
      <GameStateView />
      <RandomButton />
      <ActionButton />
    </Fragment>
  );
};


const ActionButton = () => {
  const processing = useAppSelector((x) => x.mines.processing);
  const betAmount = useAppSelector((x) => x.mines.betAmount);
  const revealCount = useAppSelector((x) => x.mines.game?.revealCount) || 0;
  const game = useAppSelector((x) => x.mines.game);
  const { payout } = Mines.getPayout(game ?? {
    betAmount:  0,
    gridSize: 4,
    mineCount:  1,
    revealCount: 0
  });
  
  const playing = usePlaying();
  const handleBet = useManualBet();
  const handleCashout = useCashout();
  const {t} = useTranslation(["games\\mines"]);
 
  if (playing) {
    return (
      <Button
        fx
        kind="primary-green"
        label={t("cashout")}
        disabled={processing || revealCount === 0}
        onClick={handleCashout}
      >
        <Tokens value={payout} />
      </Button>
    );
  }
  return (
    <Fragment>
      <Button
      fx
      kind="primary-green"
      label={betAmount === 0 ? t('games:playDemo') : t("games\\mines:placeBet")}
      loading={processing}
      disabled={processing}
      onClick={handleBet}
    />
    {betAmount === 0 && <DemoNotice />}
    </Fragment>
  );
};

const RandomButton = () => {
  const playing = usePlaying();
  const inputQueue = useAppSelector((x) => x.mines.inputQueue);
  const gridSize = useAppSelector((x) => x.mines.gridSize);
  const reveals = useAppSelector((x) => x.mines.game?.reveals) || [];
  const dispatch = useAppDispatch();
  const {t} = useTranslation(["games\\mines"]);
  const handleClick = () => {
    const revealIndex = Mines.getRandomReveal({ gridSize, reveals });
    const queued = inputQueue.includes(revealIndex);
    if (!queued) {
      dispatch(Mines.enqueueReveal(revealIndex));
    }
  };

  if (!playing) {
    return null;
  }
  return (
    <Button
      fx
      kind="tertiary-grey"
      label={t("pickRandom")}
      onClick={handleClick}
    />
  );
};

const BaseFields = () => {
  const processing = useAppSelector((x) => x.mines.processing);
  const playing = usePlaying();
  const disabled = processing || playing;

  return (
    <Fragment>
      <BetInputGroup disabled={disabled} />
      <MinesGridSizeSelector disabled={disabled} />
      <MineCountSlider disabled={disabled} />
    </Fragment>
  );
};

const GameStateView = () => {
  const betAmount = useAppSelector((x) => x.mines.betAmount) || 0;
  const gridSize = useAppSelector((x) => x.mines.gridSize);
  const mineCount = useAppSelector((x) => x.mines.mineCount);
  const game = useAppSelector((x) => x.mines.game);
  const processing = useAppSelector((x) => x.mines.processing);
  const playing = usePlaying();
  const disabled = processing || playing;
  const {t} = useTranslation(["games\\mines"]);

  if (!game || game.completed) {
    return null;
  }

  const current = Mines.getPayout({
    betAmount,
    gridSize,
    mineCount,
    revealCount: game.revealCount,
  });

  const next = Mines.getPayout({
    betAmount,
    gridSize,
    mineCount,
    revealCount: game.revealCount + 1,
  });

  return (
    <Fragment>
      <ModalSection>
        <ModalLabel>{t('currentTile')}</ModalLabel>
        {game.revealCount === 0 ? (
          <ModalField
            borderColor="brown-4"
            height={40}
            justifyContent="space-between"
            className={classNames("MinesGameInput", {disabled})}
          >
           <Span>
           {t('notTilesRevealed')}
           </Span>
          </ModalField>
        ) : (
          <ModalField 
            borderColor="brown-4"
            height={40}
            justifyContent="space-between"
            className={classNames("MinesGameInput", {disabled})}
          >
            <Tokens value={current.payout} />
            <Span
             color="sand"
            >
              {`${Numbers.floor(current.multiplier, 2).toFixed(2)}X`}
            </Span>
          </ModalField>
        )}
      </ModalSection>
      <ModalSection>
        <ModalLabel>{t('nextTile')}</ModalLabel>
        <ModalField  
          borderColor="brown-4"
          height={40}
          justifyContent="space-between"
          className={classNames("MinesGameInput", {disabled})}
        >
          <Tokens value={next.payout} />
          <Span
            color="sand"
          >
            {`${Numbers.floor(next.multiplier, 2).toFixed(2)}X`}
          </Span>
        </ModalField>
      </ModalSection>
    </Fragment>
  );
};
