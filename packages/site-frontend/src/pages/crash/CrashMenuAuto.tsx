import { Fragment } from "react";
import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetInputGroup } from "./BetInputGroup";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { SvgPercent } from "@client/svgs/common/SvgPercent";
import { CashoutInputGroup } from "./CashoutInputGroup";
import { ProfitSection } from "./ProfitSection";
import { Crash } from "#app/services/crash";
import { useProfit } from "./useProfit";
import { useAutoBet } from "./useAutoBet";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Input } from "@client/comps/input/Input";
import { SvgInfinity } from "@client/svgs/common/SvgInfinity";
import { Div } from "@client/comps/div/Div";
import { ButtonGroup } from "@client/comps/button/ButtonGroup";
import { BetBoardTicketGrid } from "./BetBoardTicketGrid";
import { ButtonNav } from "@client/comps/button/ButtonNav";
import { CrashControlMode } from "@core/types/crash/CrashControlMode";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useProcessingTicket } from "./useProcessingTicket";

export const CrashMenuAuto = () => {
  
  const autoMode = useAppSelector((x) => x.crash.autoMode);
  const small = useIsMobileLayout();
  const handleStartAuto =  useAutoBet();

  return (<Div
    wrap
    column
  >
    <ModeMenu />
    <Div
      column
      py={small ? 16 : 24}
      gap={16}
      bg="brown-6"
      borderColor="brown-4"
      borderTop
      fx
    >
      <Conditional
        value={autoMode}
        controls={ <CrashMenuAutoControls handleAutoStart={handleStartAuto} />}
        leaderboard={ <BetBoardTicketGrid />}        
      />    
    </Div>
  </Div>)
  
};

const CrashMenuAutoControls = ({handleAutoStart}: {
  handleAutoStart: () => void;
}) => {
  
  const layout = useAppSelector((x) => x.style.mainLayout);
  
  return (<Div gap={16} column>
    <Conditional value={layout}
         mobile={<CrashMenuManualMobile handleAutoStart={handleAutoStart} />}
         tablet={<CrashMenuManualMobile handleAutoStart={handleAutoStart}/>}
         desktop={<CrashMenuManualDesktop handleAutoStart={handleAutoStart}/>}
         laptop={<CrashMenuManualDesktop handleAutoStart={handleAutoStart}/>}
       />
  </Div>);
};

const CrashMenuManualMobile = ({handleAutoStart}: {
  handleAutoStart: () => void;
}) => {
  return (<Fragment>
    <ActionButton  handleAutoStart={handleAutoStart} />
    <BaseFields />    
  </Fragment>);
}
const CrashMenuManualDesktop = ({handleAutoStart}: {
  handleAutoStart: () => void;
}) => {
  return (<Fragment>
    <BaseFields />
    <ActionButton handleAutoStart={handleAutoStart}  />
  </Fragment>);
}

const ActionButton = ({handleAutoStart} : {
  handleAutoStart?: () => void;
}) => {
  
  const autoPlaying = useAppSelector((x) => x.crash.autoPlaying);
  const dispatch = useAppDispatch();
  const {overMax} = useProfit();
  const isProcessing = useProcessingTicket();
  const { t } = useTranslation(["games\\crash"]);

  if (autoPlaying) {
    return (
      <Button
        fx
        kind="primary-green"
        label={t("games\\crash:stopAutoPlay")}
        onClick={() => dispatch(Crash.setAutoPlaying(false))}
      />
    );
  } else {
    return (
      <Button
        fx
        kind="primary-green"
        label={overMax ? t("exceedMaxBet") : t("startAutoPlay")}
        disabled={overMax || isProcessing}
        onClick={handleAutoStart}
        className="flex-shrink-0"
      />
    );
  }
};

const BaseFields = () => {
  const gameCount = useAppSelector((x) => x.crash.gameCount);
  const winAction = useAppSelector((x) => x.crash.winAction);
  const winIncreaseBy = useAppSelector((x) => x.crash.winIncreaseBy);
  const lossAction = useAppSelector((x) => x.crash.lossAction);
  const lossIncreaseBy = useAppSelector((x) => x.crash.lossIncreaseBy);
  const profitLimit = useAppSelector((x) => x.crash.profitLimit);
  const lossLimit = useAppSelector((x) => x.crash.lossLimit);
  const autoPlaying = useAppSelector((x) => x.crash.autoPlaying);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["games\\crash"]);
  
  return (
    <Fragment>
      <BetInputGroup disabled={autoPlaying} />
      <CashoutInputGroup disabled={autoPlaying} />
      <ProfitSection />
      <ModalSection>
        <ModalLabel>{t("fields:bets.games")}</ModalLabel>
         <Input
          type="integer"
          placeholder="0"
          value={gameCount}
          iconRight={gameCount ? undefined : SvgInfinity}
          disabled={autoPlaying}
          onChange={(x) => dispatch(Crash.setGameCount(x))}
          iconColor="dark-sand"
        />
      </ModalSection>
      <ModalSection>
        <ModalLabel>{t("fields:bets.onWin")}</ModalLabel>
        <Div
          fx
          align="center"
          gap={8}
        >
          <Div>
            <ButtonGroup
              options={[t("common:reset"), t("common:increase")]}
              size="xssso"
              value={["reset", "increase"].indexOf(winAction)}
              disabled={autoPlaying}
              setValue={(x) => dispatch(Crash.setWinAction(x === 0 ? "reset" : "increase"))}
            />
          </Div>
          <Input
            type="decimal"
            placeholder="0.00"
            value={winIncreaseBy}
            iconRight={SvgPercent}
            disabled={autoPlaying || winAction !== "increase"}
            onChange={(x) => dispatch(Crash.setWinIncreaseBy(x))}
          />
        </Div>
      </ModalSection>    
      <ModalSection>
        <ModalLabel>{t("fields:bets.onLoss")}</ModalLabel>
        <Div
          fx
          align="center"
          gap={8}
        >
          <Div>
            <ButtonGroup
              options={[t("common:reset"), t("common:increase")]}
              size="xssso"
              labelSize={12}
              value={["reset", "increase"].indexOf(lossAction)}
              disabled={autoPlaying}
              setValue={(x) => dispatch(Crash.setLossAction(x === 0 ? "reset" : "increase"))}
            />
          </Div>
          <Input
            type="decimal"
            placeholder="0.00"
            value={lossIncreaseBy}
            iconRight={SvgPercent}
            disabled={autoPlaying || lossAction !== "increase"}
            onChange={(x) => dispatch(Crash.setLossIncreaseBy(x))}
          />
        </Div>
      </ModalSection>      
      <Div fx>
      <ModalSection>
        <ModalLabel>{t("fields:bets.stopOnProfit")}</ModalLabel>
        <Input
          type="currency"
          placeholder="0.00"
          value={profitLimit}
          disabled={autoPlaying}
          onChange={(x) => dispatch(Crash.setProfitLimit(x))}
        />
      </ModalSection>
      <ModalSection>
        <ModalLabel>{t("fields:bets.stopOnLoss")}</ModalLabel>
        <Input
          type="currency"
          placeholder="0.00"
          value={lossLimit}
          disabled={autoPlaying}
          onChange={(x) => dispatch(Crash.setLossLimit(x))}
        />
      </ModalSection>
      </Div>
    </Fragment>
  );
};

/**
 * ModeMenu for auto game, will switch between controls and leaderboard
 * @returns 
 */
const ModeMenu = () => {
  
  const autoMode = useAppSelector((x) => x.crash.autoMode);  
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const modeHandler = (x: CrashControlMode) => {
    return () => dispatch(Crash.setAutoMode(x));
  };

  return (
    <ButtonNav
      options={[
        {
          label: t("common:controls"),
          active: autoMode === "controls",
          onClick: modeHandler("controls"),
        },
        {
          label: t("common:leaderboard"),
          active: autoMode === "leaderboard",
          onClick: modeHandler("leaderboard"),
        },
      ]}
    />
  );
};
