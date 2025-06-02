import { Div } from "@client/comps/div/Div";
import { CrashEvent } from "./CrashEvent";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { CrashYAxis } from "./CrashYAxis";
import { CrashMultiplierLine } from "./CrashMultiplierLine";
import { CashoutEvents } from "./CashoutEvents";
import { Crash } from "#app/services/crash";
import { Crash as CoreCrash } from "@core/services/crash";
import { useInterval } from "usehooks-ts";
import { useState } from "react";
import { Conditional } from "@client/comps/conditional/Conditional";
import { CrashCountdown } from "./CrashCountdown";
import { Site } from "#app/services/site";
import { CrashMultiplier } from "./CrashMultiplier";
import { CrashedSimulator } from "./CrashedSimulator";
import './CrashChartContainer.scss';
import { PumpitMemoized } from "./Pumpit";

export const CrashChartContainer = () => {
  
  const userId = useAppSelector((x) => x.user._id);
  const roundTicket = useAppSelector((x) => x.crash.tickets.find((x) => x.user.id === userId));
  const crashEvents = useAppSelector((x) => x.crash.crashEvents);
  const round = useAppSelector((x) => x.crash.round);
  const cashout = roundTicket?.cashoutTriggered;
  const cashoutMultiplier = cashout ? roundTicket?.multiplierCrashed ?? 1 : 1;
  const elapsedtime = useAppSelector((x) => x.crash.elapsedTime) ?? 0;
  const serverMultiplier = CoreCrash.getMultiplierForTime(elapsedtime);
  const [multiplier, setMultiplier] = useState(serverMultiplier);
  const [timer, setTimer] = useState(elapsedtime);
  
  useInterval(() => {
    if(round.status == 'simulating' && elapsedtime > 0) {
      
      const newMultiplier = CoreCrash.getMultiplierForTime(timer);
      
      setMultiplier(Math.min(newMultiplier, serverMultiplier));
      setTimer(currentVal => currentVal + 10);
    }
    else if(round.status == 'completed'){
      
      setMultiplier(round.multiplier ?? serverMultiplier);
      setTimer(0);
    }
    else if(round.status == 'waiting' || round.status == 'pending') {
      setMultiplier(1.00);
      setTimer(0);
    }
  }, 10);

  const linePosition = Crash.getMultiplierPosition(multiplier);
  const chartOffset = Crash.chart.offset;
  const time = CoreCrash.roundTimes.waiting - Site.timeSince(round.startDate ?? new Date());
 
  return (
    <Div className="CrashChartContainer" alignItems="flex-end" justify="flex-start" gap={4}>
      {multiplier > 10 && round.status === 'simulating' && <PumpitMemoized roundId={round._id} />}    
      <CrashYAxis multiplier={multiplier} />
      {crashEvents.map((value, index) => <CrashEvent key={index} startedLine={value.startedLine} crashColor={value.crashColor} crashPosition={value.crashPosition} startedCrashLength={value.crashLength} crashLength={value.crashLength} />)}
      {(round.status === 'simulating' || round.status === 'completed') && <CrashEvent startedLine={true} crashColor={"bright-green"} crashPosition={0} startedCrashLength={0} crashLength={linePosition} />}
      {round.status === 'completed' && <CrashEvent animated startedLine={true} crashColor={"double-red"} crashPosition={-chartOffset} startedCrashLength={linePosition + chartOffset} crashLength={linePosition + chartOffset} />}
      <CrashMultiplierLine position={linePosition} status={cashout? 'simulating' : round.status } />
      {cashout && cashoutMultiplier <= multiplier && <CrashMultiplierLine status={round.status } position={Crash.getCashoutPosition(multiplier, cashoutMultiplier)} cashout={cashoutMultiplier} />}
      <CashoutEvents multiplier={multiplier}/>
      <Conditional
        value={round.status}
        waiting={<CrashCountdown time={time} events={crashEvents} />}
        pending={<CrashCountdown time={time} events={crashEvents}/>}
        simulating={<CrashMultiplier multiplier={multiplier} />}
        completed={<CrashedSimulator />}
      />
    </Div>
  );
}