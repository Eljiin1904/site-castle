import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Crash } from "#app/services/crash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useInterval } from "usehooks-ts";

export const ManageCrashEvents = () => {

  const round = useAppSelector((x) => x.crash.round);
  const events = useAppSelector((x) => x.crash.crashEvents);
  const dispatch = useDispatch();

  useEffect(() => {
    if (round.status === 'simulating') {
      const crashEvent = Crash.createCrashEvent({ startAtLine: true,color: 'double-red'}, events[events.length - 1]);
      dispatch( Crash.addCrashEvent(crashEvent));
    }
  }, [round.status]);

   useInterval(() => {
   
    if(events.length === 0)
      dispatch(Crash.addCrashEvent(Crash.createCrashEvent({startAtLine: true, color: "bright-green"})));
    else if(events.length > 0)
      dispatch(Crash.addCrashEvent(Crash.createCrashEvent({startAtLine: false}, events[events.length - 1])));
   }, round.status === 'waiting' || round.status === 'pending' ? 500: null);

  return null;
};