import { Div } from "@client/comps/div/Div";
import { CrashEvent } from "./CrashEvent";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { CrashYAxis } from "./CrashYAxis";
import { CrashMultiplierLine } from "./CrashMultiplierLine";
import { CashoutEvents } from "./CashoutEvents";
import { Crash } from "#app/services/crash";
import { Crash as CoreCrash } from "@core/services/crash";
import { useInterval } from "usehooks-ts";
import { useEffect, useState } from "react";
import { Conditional } from "@client/comps/conditional/Conditional";
import { CrashCountdown } from "./CrashCountdown";
import { Site } from "#app/services/site";
import { CrashMultiplier } from "./CrashMultiplier";
import { CrashedSimulator } from "./CrashedSimulator";
import './CrashChartContainer.scss';

export const CrashChartContainer = () => {
  
  const userId = useAppSelector((x) => x.user._id);
  const roundTicket = useAppSelector((x) => x.crash.tickets.find((x) => x.user.id === userId));
  const crashEvents = useAppSelector((x) => x.crash.crashEvents);
  const round = useAppSelector((x) => x.crash.round);
  const cashout = roundTicket?.cashoutTriggered;
  const cashoutMultiplier = cashout ? roundTicket?.multiplierCrashed ?? 1 : 1;
  const roundStartedTime = useAppSelector((x) => x.crash.roundStartingTime) ?? 0;
  const currentMultiplier = Math.max(1, useAppSelector((x) => x.crash.round.multiplier));
  
  const [multiplier, setMultiplier] = useState(currentMultiplier);
  const [timer, setTimer] = useState(Date.now() - roundStartedTime);


  useInterval(() => {
    if(round.status == 'simulating') {
      if (timer > 0 ) {
        const newMultiplier = CoreCrash.getMultiplierForTime(timer);
        console.log("Calc Multiplier:", newMultiplier, "Current Multiplier:", currentMultiplier);      
        setMultiplier(Math.min(newMultiplier, currentMultiplier));
      }
      setTimer(currentVal => currentVal + 10);
    }
    else if(round.status == 'completed'){
      
      setMultiplier(round.multiplierCrash ?? multiplier);
      setTimer(0);
    }
    else if(round.status == 'waiting' || round.status == 'pending') {
      setMultiplier(1.00);
      setTimer(0);
    }
  }, 10);

  useEffect(() => {
    if (roundStartedTime > 0) {
      setTimer(Date.now() - roundStartedTime);
      const initialMultiplier = CoreCrash.getMultiplierForTime(Date.now() - roundStartedTime);
      setMultiplier(Math.min(initialMultiplier, currentMultiplier));
    }
  }, [round._id]);

  const linePosition = Crash.getMultiplierPosition(multiplier);
  const chartOffset = Crash.chart.offset;
  const time = CoreCrash.roundTimes.waiting - Site.timeSince(round.startDate ?? new Date());
 
  return (
    <Div className="CrashChartContainer" alignItems="flex-end" justify="flex-start" gap={4}>
      <CrashYAxis multiplier={multiplier} />
      {crashEvents.map((value, index) => <CrashEvent key={index} startedLine={value.startedLine} crashColor={value.crashColor} crashPosition={value.crashPosition} startedCrashLength={value.crashLength} crashLength={value.crashLength} />)}
      <CrashEvent startedLine={true} crashColor={"bright-green"} crashPosition={0} startedCrashLength={0} crashLength={linePosition} />
      {round.status === 'completed' && <CrashEvent startedLine={true} crashColor={"double-red"} crashPosition={-chartOffset} startedCrashLength={linePosition + chartOffset} crashLength={linePosition + chartOffset} />}
      <CrashMultiplierLine position={linePosition} status={cashout? 'simulating' : round.status } />
      {cashout && <CrashMultiplierLine status={round.status } position={Crash.getCashoutPosition(multiplier, cashoutMultiplier)} cashout={cashoutMultiplier} />}
      <CashoutEvents />
      <Conditional
        value={round.status}
        waiting={<CrashCountdown time={time} events={crashEvents} />}
        pending={<CrashCountdown time={time} events={crashEvents}/>}
        simulating={<CrashMultiplier multiplier={multiplier} />}
        completed={<CrashedSimulator multiplier={round.multiplierCrash ?? multiplier} />}
      />
    </Div>
  );
}