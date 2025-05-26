import { Div } from "@client/comps/div/Div";
import { CrashEvent } from "./CrashEvent";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { CrashYAxis } from "./CrashYAxis";
import { CrashMultiplierLine } from "./CrashMultiplierLine";
import { CashoutEvents } from "./CashoutEvents";
import { Crash } from "#app/services/crash";
import './CrashChartContainer.scss';

export const CrashChartContainer = () => {
  
  const userId = useAppSelector((x) => x.user._id);
  const roundTicket = useAppSelector((x) => x.crash.tickets.find((x) => x.user.id === userId));
  const crashEvents = useAppSelector((x) => x.crash.crashEvents);
  const currentMultiplier =  useAppSelector((x) => x.crash.round.multiplier);
  const status = useAppSelector((x) => x.crash.round.status);
  const cashout = roundTicket?.cashoutTriggered;
  const cashoutMultiplier = cashout ? roundTicket?.multiplierCrashed ?? 1 : 1;
  const multiplierLinePosition = Crash.getMultiplierPosition(currentMultiplier);
 
  return (
    <Div className="CrashChartContainer" alignItems="flex-end" justify="flex-start" gap={4}>
      <CrashYAxis multiplier={currentMultiplier} />
      {crashEvents.map((value, index) => <CrashEvent key={index} startedLine={value.startedLine} crashColor={value.crashColor} crashPosition={value.crashPosition} startedCrashLength={value.crashLength} crashLength={value.crashLength} />)}
      <CrashMultiplierLine position={multiplierLinePosition} status={cashout? 'simulating' : status} />
      {cashout && <CrashMultiplierLine status={status} position={Crash.getCashoutPosition(currentMultiplier, cashoutMultiplier)} cashout={cashoutMultiplier} />}
      <CashoutEvents />
    </Div>
  );
}