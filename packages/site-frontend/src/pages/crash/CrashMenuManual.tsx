import { Fragment } from "react";
import { Button } from "@client/comps/button/Button";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetInputGroup } from "./BetInputGroup";
import { useManualBet } from "./useManualBet";
import { ProfitSection } from "./ProfitSection";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { CashoutInputGroup } from "./CashoutInputGroup";
import { Div } from "@client/comps/div/Div";
import { useProfit } from "./useProfit";
import { useProcessingTicket } from "./useProcessingTicket";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Crash } from "#app/services/crash";
import { Conditional } from "@client/comps/conditional/Conditional";

export const CrashMenuManual = () => {
  
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (<Div fx column gap={16}>
    <Conditional value={layout}
      mobile={<CrashMenuManualMobile />}
      tablet={<CrashMenuManualMobile />}
      desktop={<CrashMenuManualDesktop />}
      laptop={<CrashMenuManualDesktop />}
    />
  </Div>);
};

const CrashMenuManualMobile = () => {
  return (<Fragment>
    <ActionButton />
    <BaseFields />    
  </Fragment>);
}
const CrashMenuManualDesktop = () => {
  return (<Fragment>
    <BaseFields />
    <ActionButton />
  </Fragment>);
}

const BaseFields = () => {
  const isProcessing = useProcessingTicket();
  const betNextRound = useAppSelector((x) => x.crash.betNextRound);
  
  return (
    <Fragment>
      <BetInputGroup disabled={isProcessing || betNextRound} />
      <CashoutInputGroup disabled={isProcessing || betNextRound} />
      <ProfitSection />
    </Fragment>
  );
};
/**
 * The action button for the crash game, it will show different button based on the game status
 * The posible status are:
 * - waiting: the game is waiting for the next round ( allow to bet in current round)
 * - pending: the game is starting (not allow to bet)
 * - simulating: the game is running ( will allow to bet next round)
 * - completed: the game is completed ( will allow to bet next round)
 * Action is disabled when:
 * - the profit is exceeding the max bet
 * - the game is pending
 * - there is already a bet in the current round
 * @returns 
 */
const ActionButton = () => {
  
  const roundStatus = useAppSelector((x) => x.crash.round.status);
  const betNextRound = useAppSelector((x) => x.crash.betNextRound);
  const {handleBet, handleCashout, allowCashout} = useManualBet();
  const isProcessing = useProcessingTicket();
  const dispatch = useAppDispatch();
  const {t} = useTranslation(["games\\crash"]);
  const { overMax } = useProfit();
  
  let label = roundStatus === "pending" ? t('starting') : overMax ? t('exceedMaxBet') :  t("placeBet");
 
  const allowNextRound = roundStatus === "simulating" || roundStatus === "completed";
  const isDisabled = overMax || roundStatus === 'pending' || isProcessing;
  
  if(allowCashout)
    return (<Button
      fx
      kind="primary-green"
      label={t("cashout")}
      onClick={handleCashout}
    />);
  else if(betNextRound)
    return (<Button
      fx
      kind="tertiary-grey"
      label={t("cancelBet")}
      onClick={() => dispatch(Crash.setBetNextRound(false))}
    />);  
  else  
    return (<Button
      fx
      kind="primary-green"
      label={label}
      disabled={isDisabled}
      onClick={handleBet}
    >
    {allowNextRound && <Div fontWeight="regular" fontSize={16} lineHeight={24} color="dark-brown">({t('nextRound')})</Div>}
    </Button>);
};