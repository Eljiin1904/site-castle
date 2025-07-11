import { Fragment } from "react";
import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { ButtonGroup } from "@client/comps/button/ButtonGroup";
import { Conditional } from "@client/comps/conditional/Conditional";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Input } from "@client/comps/input/Input";
import { SvgInfinity } from "@client/svgs/common/SvgInfinity";
import { SvgPercent } from "@client/svgs/common/SvgPercent";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { ModalField } from "@client/comps/modal/ModalField";
import { Vector } from "@client/comps/vector/Vector";
import { Tokens } from "@client/comps/tokens/Tokens";
import { SvgCancel } from "@client/svgs/common/SvgCancel";
import { Span } from "@client/comps/span/Span";
import { Mines } from "#app/services/mines";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetInputGroup } from "./BetInputGroup";
import { MineCountSlider } from "./MineCountSlider";
import { MinesGridSizeSelector } from "./MinesGridSizeSelector";
import { useAutoBet } from "./useAutoBet";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { DemoNotice } from "#app/comps/demo/DemoNotice";

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
  return (<Fragment>
        <BaseFields />
        <ActionButton />
      </Fragment>);

  
};

const ActionButton = () => {
  const betAmount = useAppSelector((x) => x.mines.betAmount) || 0;
  const gridSize = useAppSelector((x) => x.mines.gridSize);
  const mineCount = useAppSelector((x) => x.mines.mineCount);
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const autoIndexes = useAppSelector((x) => x.mines.autoIndexes);
  const processing = useAppSelector((x) => x.mines.processing);
  const dispatch = useAppDispatch();
  const {t} = useTranslation(["games\\mines"]);
  const handleStartAuto = useAutoBet();
  const gameLabel = betAmount === 0 ? t('games:autoPlayDemo') :t("games\\mines:startAutoPlay");

  if (autoPlaying) {
    return (
      <Button
        fx
        kind="primary-green"
        label={t('games\\mines:stopAutoPlay')}
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
  
    return (<Fragment>
      <Button
        fx
        kind="primary-green"
        label={hasMaxProfit ? t('games\\mines:exceedMaxBet') : gameLabel}
        disabled={disabled}
        onClick={handleStartAuto}
        flexShrink
      />
      {betAmount === 0 && <DemoNotice />}
    </Fragment>);
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
  const {t} = useTranslation();
  return (
    <ModalSection>
      <ModalLabel>{t("fields:bets.games")}</ModalLabel>
      <Input
        type="integer"
        placeholder="0"
        value={gameCount}
        iconRight={gameCount ? undefined : SvgInfinity}
        disabled={autoPlaying}
        onChange={(x) => dispatch(Mines.setGameCount(x))}
        iconColor="dark-sand"
      />
    </ModalSection>
  );
};

const IndexSection = () => {
  const autoIndexes = useAppSelector((x) => x.mines.autoIndexes);
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const count = autoIndexes.length;
  const dispatch = useAppDispatch();
  const {t} = useTranslation(["games\\mines"]);
  return (
    <ModalSection>
      <ModalLabel>{t('tilePattern')}</ModalLabel>
      <ModalField
      align="center"
      gap={12}
      borderColor="brown-4"
      height={40}
      justifyContent="space-between"
      >
        <Div
          grow
          align="center"
          gap={12}
        >
          <Span
            color="dark-sand"
          >
            {t('tileSelected',{count: count})}
          </Span>
        </Div>
        <Vector
          as={SvgRedo}
          ml={4}
          size={16}
          data-tooltip-id="app-tooltip"
          data-tooltip-content={t('reset')}
          hover="highlight"
          cursor={autoPlaying ? "not-allowed" : "pointer"}
          onClick={autoPlaying ? undefined : () => dispatch(Mines.setGame(undefined))}
        />
        <Vector
        as={SvgCancel}
        size={16}
        color="double-red"
        data-tooltip-id="app-tooltip"
        data-tooltip-content={t('clear')}
        hover="highlight"
        cursor={autoPlaying ? "not-allowed" : "pointer"}
        onClick={autoPlaying ? undefined : () => dispatch(Mines.clearAutoIndexes())}
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
  const {t} = useTranslation(["games\\mines"]);
  const { profit, payout, multiplier } = Mines.getPayout({
    betAmount,
    gridSize,
    mineCount,
    revealCount: autoIndexes.length,
  });

  const overMaxProfit = profit >= Mines.maxProfit;

  return (
    <ModalSection>
      <ModalLabel>{t('payout')}</ModalLabel>
      {overMaxProfit ? (
        <ModalField fontSize={12}>
          <Span>{t('exceedMaxBet')}</Span>
        </ModalField>
      ) : (
        <ModalField  
        borderColor="brown-4"
        height={40}
        justifyContent="space-between">
          <Tokens value={payout} />
          <Span
            color="sand"
          >
            {`${Numbers.floor(multiplier, 2).toFixed(2)}X`}
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
  const {t} = useTranslation(["games\\mines"]);
  return (
    <ModalSection>
      <ModalLabel>{t("fields:bets.onWin")}</ModalLabel>
      <Div
        fx
        align="center"
        gap={8}
      >
        <Div>
          <ButtonGroup
            options={[t('common:reset'), t('common:increase')]}
            size="xssso"
            value={["reset", "increase"].indexOf(winAction)}
            disabled={autoPlaying}
            setValue={(x) =>
              dispatch(Mines.setWinAction(x === 0 ? "reset" : "increase"))
            }
          />
        </Div>
        <Input
          type="decimal"
          placeholder="0.00"
          value={winIncreaseBy}
          iconRight={SvgPercent}
          disabled={autoPlaying || winAction !== "increase"}
          onChange={(x) => dispatch(Mines.setWinIncreaseBy(x))}
          
        />          
      </Div>
    </ModalSection>
  );
};

const LossSection = () => {
  const lossAction = useAppSelector((x) => x.mines.lossAction);
  const lossIncreaseBy = useAppSelector((x) => x.mines.lossIncreaseBy);
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const dispatch = useAppDispatch();
  const {t} = useTranslation(["games\\mines"]);
  return (
    <ModalSection>
      <ModalLabel>{t("fields:bets.onLoss")}</ModalLabel>
        <Div
          fx
          align="center"
          gap={8}
        >
          <Div>
            <ButtonGroup
              options={[t('common:reset'), t('common:increase')]}
              size="xssso"
              labelSize={12}
              value={["reset", "increase"].indexOf(lossAction)}
              disabled={autoPlaying}
              setValue={(x) =>
                dispatch(Mines.setLossAction(x === 0 ? "reset" : "increase"))
              }
            />
          </Div>
          <Input
            type="decimal"
            placeholder="0.00"
            value={lossIncreaseBy}
            iconRight={ SvgPercent}           
            disabled={autoPlaying || lossAction !== "increase"}
            onChange={(x) => dispatch(Mines.setLossIncreaseBy(x))}
          />
        </Div>
    </ModalSection>
  );
};

const StopProfitSection = () => {
  const profitLimit = useAppSelector((x) => x.mines.profitLimit);
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const dispatch = useAppDispatch();
  const {t} = useTranslation(["games\\mines"]);
  return (
    <ModalSection>
      <ModalLabel>{t("fields:bets.stopOnProfit")}</ModalLabel>
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
  const {t} = useTranslation(["games\\mines"]);
  return (
    <ModalSection>
      <ModalLabel>{t("fields:bets.stopOnLoss")}</ModalLabel>
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
