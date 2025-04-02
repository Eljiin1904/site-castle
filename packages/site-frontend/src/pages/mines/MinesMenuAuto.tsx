import { Fragment } from "react";
import { Numbers } from "#core/services/numbers";
import { Div } from "#client/comps/div/Div";
import { Button } from "#client/comps/button/Button";
import { ButtonGroup } from "#client/comps/button/ButtonGroup";
import { Conditional } from "#client/comps/conditional/Conditional";
import { ModalSection } from "#client/comps/modal/ModalSection";
import { ModalLabel } from "#client/comps/modal/ModalLabel";
import { Input } from "#client/comps/input/Input";
import { SvgInfinity } from "#client/svgs/common/SvgInfinity";
import { SvgPercent } from "#client/svgs/common/SvgPercent";
import { SvgRedo } from "#client/svgs/common/SvgRedo";
import { ModalField } from "#client/comps/modal/ModalField";
import { Vector } from "#client/comps/vector/Vector";
import { Tokens } from "#client/comps/tokens/Tokens";
import { SvgCancel } from "#client/svgs/common/SvgCancel";
import { SvgCategory } from "#client/svgs/common/SvgCategory";
import { SvgChicken } from "#client/svgs/common/SvgChicken";
import { Span } from "#client/comps/span/Span";
import { Mines } from "#app/services/mines";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetInputGroup } from "./BetInputGroup";
import { MineCountSlider } from "./MineCountSlider";
import { MinesGridSizeSelector } from "./MinesGridSizeSelector";
import { useAutoBet } from "./useAutoBet";

export const MinesMenuAuto = () => {
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
      <ActionButton />
      <BaseFields />
    </Fragment>
  );
};

const NotMobileContent = () => {
  return (
    <Div
      column
      overflow="hidden"
    >
      <Div
        column
        overflow="hidden"
      >
        <Div
          column
          gap={12}
          pb={12}
          overflow="auto"
          enableScrollbar
        >
          <BaseFields />
        </Div>
      </Div>
      <Div
        fx
        pt={16}
        borderTop
      >
        <ActionButton />
      </Div>
    </Div>
  );
};

const ActionButton = () => {
  const betAmount = useAppSelector((x) => x.mines.betAmount) || 0;
  const gridSize = useAppSelector((x) => x.mines.gridSize);
  const mineCount = useAppSelector((x) => x.mines.mineCount);
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const autoIndexes = useAppSelector((x) => x.mines.autoIndexes);
  const processing = useAppSelector((x) => x.mines.processing);
  const dispatch = useAppDispatch();

  const handleStartAuto = useAutoBet();

  if (autoPlaying) {
    return (
      <Button
        fx
        kind="primary"
        label="Stop Auto Play"
        onClick={() => dispatch(Mines.setAutoPlaying(false))}
      />
    );
  } else {
    const revealCount = autoIndexes.length;

    const { profit } = Mines.getPayout({
      betAmount,
      gridSize,
      mineCount,
      revealCount,
    });

    const hasMaxProfit = profit >= Mines.maxProfit;
    const disabled = processing || revealCount === 0 || hasMaxProfit;

    return (
      <Button
        fx
        kind="primary"
        label={hasMaxProfit ? "Exceeds Max Profit" : "Start Auto Play"}
        disabled={disabled}
        onClick={handleStartAuto}
      />
    );
  }
};

const BaseFields = () => {
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);

  return (
    <Fragment>
      <BetInputGroup disabled={autoPlaying} />
      <MinesGridSizeSelector disabled={autoPlaying} />
      <MineCountSlider disabled={autoPlaying} />
      <GamesInput />
      <IndexSection />
      <PayoutSection />
      <WinSection />
      <LossSection />
      <StopProfitSection />
      <StopLossSection />
    </Fragment>
  );
};

const GamesInput = () => {
  const gameCount = useAppSelector((x) => x.mines.gameCount);
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const dispatch = useAppDispatch();

  return (
    <ModalSection>
      <ModalLabel>{"Games"}</ModalLabel>
      <Input
        type="integer"
        placeholder="0"
        value={gameCount}
        iconLeft={SvgChicken}
        iconRight={gameCount ? undefined : SvgInfinity}
        disabled={autoPlaying}
        onChange={(x) => dispatch(Mines.setGameCount(x))}
      />
    </ModalSection>
  );
};

const IndexSection = () => {
  const autoIndexes = useAppSelector((x) => x.mines.autoIndexes);
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const count = autoIndexes.length;
  const dispatch = useAppDispatch();

  return (
    <ModalSection>
      <ModalLabel>{"Tile Pattern"}</ModalLabel>
      <ModalField>
        <Div
          grow
          align="center"
          gap={12}
        >
          <Vector
            as={SvgCategory}
            size={16}
            color="light-purple"
          />
          <Span
            weight="medium"
            color="light-gray"
          >
            {count}
            {" tile"}
            {count !== 1 && "s"}
            {" selected"}
          </Span>
        </Div>
        <Vector
          as={SvgCancel}
          size={16}
          color="light-red"
          data-tooltip-id="app-tooltip"
          data-tooltip-content="Clear"
          hover="highlight"
          cursor={autoPlaying ? "not-allowed" : "pointer"}
          onClick={autoPlaying ? undefined : () => dispatch(Mines.clearAutoIndexes())}
        />
        <Vector
          as={SvgRedo}
          ml={4}
          size={16}
          color="light-blue"
          data-tooltip-id="app-tooltip"
          data-tooltip-content="Reset"
          hover="highlight"
          cursor={autoPlaying ? "not-allowed" : "pointer"}
          onClick={autoPlaying ? undefined : () => dispatch(Mines.setGame(undefined))}
        />
      </ModalField>
    </ModalSection>
  );
};

const PayoutSection = () => {
  const betAmount = useAppSelector((x) => x.mines.betAmount) || 0;
  const gridSize = useAppSelector((x) => x.mines.gridSize);
  const mineCount = useAppSelector((x) => x.mines.mineCount);
  const autoIndexes = useAppSelector((x) => x.mines.autoIndexes);

  const { profit, payout, multiplier } = Mines.getPayout({
    betAmount,
    gridSize,
    mineCount,
    revealCount: autoIndexes.length,
  });

  const overMaxProfit = profit >= Mines.maxProfit;

  return (
    <ModalSection>
      <ModalLabel>{"Payout"}</ModalLabel>
      {overMaxProfit ? (
        <ModalField fontSize={12}>
          <Span>{"Exceeds Max Profit"}</Span>
        </ModalField>
      ) : (
        <ModalField justify="space-between">
          <Tokens value={payout} />
          <Span
            family="title"
            weight="bold"
            color="light-blue"
          >
            {`${Numbers.floor(multiplier, 2).toFixed(2)}x`}
          </Span>
        </ModalField>
      )}
    </ModalSection>
  );
};

const WinSection = () => {
  const winAction = useAppSelector((x) => x.mines.winAction);
  const winIncreaseBy = useAppSelector((x) => x.mines.winIncreaseBy);
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const dispatch = useAppDispatch();

  return (
    <ModalSection>
      <ModalLabel>{"On Win"}</ModalLabel>
      <Div
        fx
        align="center"
      >
        <Input
          type="decimal"
          placeholder="0.00"
          value={winIncreaseBy}
          iconRight={SvgPercent}
          disabled={autoPlaying || winAction !== "increase"}
          onChange={(x) => dispatch(Mines.setWinIncreaseBy(x))}
          style={{ paddingLeft: "182px" }}
        />
        <Div
          position="absolute"
          left={4}
        >
          <ButtonGroup
            options={["Reset", "Increase By"]}
            size="xs"
            labelSize={13}
            value={["reset", "increase"].indexOf(winAction)}
            disabled={autoPlaying}
            setValue={(x) => dispatch(Mines.setWinAction(x === 0 ? "reset" : "increase"))}
          />
        </Div>
      </Div>
    </ModalSection>
  );
};

const LossSection = () => {
  const lossAction = useAppSelector((x) => x.mines.lossAction);
  const lossIncreaseBy = useAppSelector((x) => x.mines.lossIncreaseBy);
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const dispatch = useAppDispatch();

  return (
    <ModalSection>
      <ModalLabel>{"On Loss"}</ModalLabel>
      <Div
        fx
        align="center"
      >
        <Input
          type="decimal"
          placeholder="0.00"
          value={lossIncreaseBy}
          iconRight={SvgPercent}
          disabled={autoPlaying || lossAction !== "increase"}
          onChange={(x) => dispatch(Mines.setLossIncreaseBy(x))}
          style={{ paddingLeft: "182px" }}
        />
        <Div
          position="absolute"
          left={4}
        >
          <ButtonGroup
            options={["Reset", "Increase By"]}
            size="xs"
            labelSize={13}
            value={["reset", "increase"].indexOf(lossAction)}
            disabled={autoPlaying}
            setValue={(x) => dispatch(Mines.setLossAction(x === 0 ? "reset" : "increase"))}
          />
        </Div>
      </Div>
    </ModalSection>
  );
};

const StopProfitSection = () => {
  const profitLimit = useAppSelector((x) => x.mines.profitLimit);
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const dispatch = useAppDispatch();

  return (
    <ModalSection>
      <ModalLabel>{"Stop on Profit"}</ModalLabel>
      <Input
        type="currency"
        placeholder="0.00"
        value={profitLimit}
        disabled={autoPlaying}
        onChange={(x) => dispatch(Mines.setProfitLimit(x))}
      />
    </ModalSection>
  );
};

const StopLossSection = () => {
  const lossLimit = useAppSelector((x) => x.mines.lossLimit);
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const dispatch = useAppDispatch();

  return (
    <ModalSection>
      <ModalLabel>{"Stop on Loss"}</ModalLabel>
      <Input
        type="currency"
        placeholder="0.00"
        value={lossLimit}
        disabled={autoPlaying}
        onChange={(x) => dispatch(Mines.setLossLimit(x))}
      />
    </ModalSection>
  );
};
