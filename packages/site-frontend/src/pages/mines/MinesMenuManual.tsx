import { Fragment } from "react";
import { Numbers } from "#core/services/numbers";
import { Button } from "#client/comps/button/Button";
import { Div } from "#client/comps/div/Div";
import { Conditional } from "#client/comps/conditional/Conditional";
import { Span } from "#client/comps/span/Span";
import { Tokens } from "#client/comps/tokens/Tokens";
import { ModalSection } from "#client/comps/modal/ModalSection";
import { ModalLabel } from "#client/comps/modal/ModalLabel";
import { ModalField } from "#client/comps/modal/ModalField";
import { Mines } from "#app/services/mines";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { MineCountSlider } from "./MineCountSlider";
import { MinesGridSizeSelector } from "./MinesGridSizeSelector";
import { BetInputGroup } from "./BetInputGroup";
import { useCashout } from "./useCashout";
import { useManualBet } from "./useManualBet";
import { usePlaying } from "./usePlaying";

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
      <Div grow />
      <Div
        fx
        column
        pt={16}
        gap={12}
        borderTop
      >
        <RandomButton />
        <ActionButton />
      </Div>
    </Fragment>
  );
};

const ActionButton = () => {
  const processing = useAppSelector((x) => x.mines.processing);
  const revealCount = useAppSelector((x) => x.mines.game?.revealCount) || 0;
  const playing = usePlaying();
  const handleBet = useManualBet();
  const handleCashout = useCashout();

  if (playing) {
    return (
      <Button
        fx
        kind="primary"
        label="Cashout"
        disabled={processing || revealCount === 0}
        onClick={handleCashout}
      />
    );
  }
  return (
    <Button
      fx
      kind="primary"
      label="Play"
      loading={processing}
      disabled={processing}
      onClick={handleBet}
    />
  );
};

const RandomButton = () => {
  const playing = usePlaying();
  const inputQueue = useAppSelector((x) => x.mines.inputQueue);
  const gridSize = useAppSelector((x) => x.mines.gridSize);
  const reveals = useAppSelector((x) => x.mines.game?.reveals) || [];
  const dispatch = useAppDispatch();

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
      kind="secondary"
      label="Pick Random Tile"
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
        <ModalLabel>{"Current Tile"}</ModalLabel>
        {game.revealCount === 0 ? (
          <ModalField
            color="dark-gray"
            style={{ height: "42px" }} // keep the same height as below
          >
            {"No tiles revealed"}
          </ModalField>
        ) : (
          <ModalField justify="space-between">
            <Tokens value={current.payout} />
            <Span
              family="title"
              weight="bold"
              color="light-blue"
            >
              {`${Numbers.floor(current.multiplier, 2).toFixed(2)}x`}
            </Span>
          </ModalField>
        )}
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Next Tile"}</ModalLabel>
        <ModalField justify="space-between">
          <Tokens value={next.payout} />
          <Span
            family="title"
            weight="bold"
            color="light-blue"
          >
            {`${Numbers.floor(next.multiplier, 2).toFixed(2)}x`}
          </Span>
        </ModalField>
      </ModalSection>
    </Fragment>
  );
};
