import { Div } from "@client/comps/div/Div";
import { CrashEvent } from "./CrashEvent";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { CrashYAxis } from "./CrashYAxis";
import { CrashMultiplierLine } from "./CrashMultiplierLine";
import { CashoutEvents } from "./CashoutEvents";
import { Crash } from "#app/services/crash";
import { Crash as CoreCrash } from "@core/services/crash";
import './CrashChartContainer.scss';
import { useInterval } from "usehooks-ts";
import { useEffect, useState } from "react";

export const CrashChartContainer = () => {
  
  const userId = useAppSelector((x) => x.user._id);
  const roundTicket = useAppSelector((x) => x.crash.tickets.find((x) => x.user.id === userId));
  const crashEvents = useAppSelector((x) => x.crash.crashEvents);
  const round = useAppSelector((x) => x.crash.round);
  //const currentMultiplier =  useAppSelector((x) => x.crash.round.multiplier);
  const status = useAppSelector((x) => x.crash.round.status);
  const cashout = roundTicket?.cashoutTriggered;
  const cashoutMultiplier = cashout ? roundTicket?.multiplierCrashed ?? 1 : 1;
  //const multiplierLinePosition = Crash.getMultiplierPosition(currentMultiplier);
  const roundStartedTime = useAppSelector((x) => x.crash.roundElapsedTime) ?? 0;
  

   const [multiplier, setMultiplier] = useState(0);
   const [timer, setTimer] = useState(roundStartedTime);
    
    useInterval(() => {
     if(round.status == 'simulating') {

        if (timer > 0 ) {
          const currentMultiplier = CoreCrash.getMultiplierForTime(timer);
          setMultiplier(currentMultiplier);
        }
        setTimer(currentVal => currentVal + 100);
     }
     else if(round.status !== 'completed'){
      setMultiplier(0);
      setTimer(0);
     }
    }, 100);

    useEffect(() => {
      if (roundStartedTime > 0) {
        setTimer(roundStartedTime);
        const initialMultiplier = CoreCrash.getMultiplierForTime(roundStartedTime);
        setMultiplier(initialMultiplier);
      }
    }, [roundStartedTime]);

 
  return (
    <Div className="CrashChartContainer" alignItems="flex-end" justify="flex-start" gap={4}>
      <CrashYAxis multiplier={multiplier} />
      {crashEvents.map((value, index) => <CrashEvent key={index} startedLine={value.startedLine} crashColor={value.crashColor} crashPosition={value.crashPosition} startedCrashLength={value.crashLength} crashLength={value.crashLength} />)}
      <CrashMultiplierLine position={ Crash.getMultiplierPosition(multiplier)} status={cashout? 'simulating' : status} />
      {cashout && <CrashMultiplierLine status={status} position={Crash.getCashoutPosition(multiplier, cashoutMultiplier)} cashout={cashoutMultiplier} />}
      <CashoutEvents />
    </Div>
  );
}