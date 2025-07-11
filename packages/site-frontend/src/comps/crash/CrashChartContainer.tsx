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
import { PumpitMemoized } from "./Pumpit";
import { ManageCrashEvents } from "./ManageCrashEvents";
import './CrashChartContainer.scss';

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
 
  useInterval(() => {
    if(round.status == 'simulating' && elapsedtime > 0) {
      
      const timer = Site.timeSince(round.startDate ?? new Date());
      const newMultiplier = CoreCrash.getMultiplierForTime(timer);
      setMultiplier(Math.min(newMultiplier, serverMultiplier));
      if(newMultiplier  === Infinity) {
        setMultiplier(1.00);
      }
    }
    else if(round.status == 'completed'){
      
      setMultiplier(round.multiplier ?? serverMultiplier);
    }
    else if(round.status == 'waiting' || round.status == 'pending') {
      setMultiplier(1.00);
    }
  }, 10);

  let linePosition =round.status === 'completed' ?  Crash.getMultiplierPosition(round.multiplier ?? 1): Crash.getMultiplierPosition(multiplier);
  const chartOffset = Crash.chart.offset;
  const time = CoreCrash.roundTimes.waiting - Site.timeSince(round.startDate ?? new Date());
 
  return (
    <Div className="CrashChartContainer" alignItems="flex-end" justify="flex-start" gap={4}>
      <ManageCrashEvents />
      {multiplier >= 10 && multiplier <=11 && <PumpitMemoized roundId={round._id} />}    
      <CrashYAxis multiplier={multiplier} />
      {crashEvents.map((value, index) => <CrashEvent multiplier={multiplier} key={index} startAtLine={value.startAtLine} color={value.color} position={value.position} initialHeight={value.height} height={value.height} />)}
      {(round.status === 'simulating' || round.status === 'completed') && <CrashEvent multiplier={1} startAtLine={true} color={"bright-green"} position={0} initialHeight={0} height={linePosition} />}
      {round.status === 'completed' && <CrashEvent multiplier={1} animated startAtLine={true} color={"double-red"} position={-chartOffset} initialHeight={linePosition + chartOffset} height={linePosition + chartOffset} />}
      <CrashMultiplierLine position={linePosition} status={cashout? 'simulating' : round.status } />
      {cashout && cashoutMultiplier <= multiplier && <CrashMultiplierLine status={round.status } position={Crash.getCashoutPosition(multiplier, cashoutMultiplier)} cashout={cashoutMultiplier} />}
      <CashoutEvents multiplier={multiplier}/>
      <Conditional
        value={round.status}
        waiting={<CrashCountdown time={time} />}
        pending={<CrashCountdown time={time} />}
        simulating={<CrashMultiplier multiplier={multiplier} />}
        completed={<CrashedSimulator />}
      />
    </Div>
  );
}