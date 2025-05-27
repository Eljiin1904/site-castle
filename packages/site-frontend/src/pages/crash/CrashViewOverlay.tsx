import { useState } from "react";
import { useInterval } from "usehooks-ts";
import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Site } from "#app/services/site";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { CrashChartContainer } from "#app/comps/crash/CrashChartContainer";
import { CrashSimulator } from "./CrashSimulator";
import { CrashedSimulator } from "./CrashedSimulator";
import { useDispatch } from "react-redux";
import { addCrashEvent } from "#app/services/crash/Crash";
import { Crash } from "#app/services/crash";
import { Crash as CoreCrash } from "@core/services/crash";


export const CrashViewOverlay = () => {
  const round = useAppSelector((x) => x.crash.round);

  return (
    <Div
      position="absolute"
      left={0}
      right={0}
      top={0}
      bottom={0}
      center
    >
      <Conditional
        value={round.status}
        waiting={<CrashCountdown />}
        pending={<CrashPending />}
        simulating={<CrashSimulator />}
        completed={<CrashedSimulator />}
      />
      <CrashChartContainer />
    </Div>
  );
};

const CrashCountdown = () => {
  
  const crashEvents = useAppSelector((x) => x.crash.crashEvents);
  const statusDate = useAppSelector((x) => x.crash.round.statusDate);
  const getRemainder = () => CoreCrash.roundTimes.waiting - Site.timeSince(statusDate);
  const [timer, setTimer] = useState(getRemainder());
  const {t} = useTranslation(["games\\crash"]);
  const dispatch = useDispatch();

  useInterval(() => {
    setTimer(getRemainder());
    const newChartLine = Crash.createCrashEvent(crashEvents.length === 0);
    dispatch(addCrashEvent(newChartLine));
  }, 250);

  return (
    <Div
      className="DoubleTimerOverlay"
      column
      center
      zIndex={10}
      fx
      fy
      gap={12}
     
    >
      <Span
        size={16}
        family="title"
        weight="regular"
        lineHeight={24}
        textTransform="uppercase"
      >
      { t('starting')}
      </Span>
      <Span
        family="title"
        weight="regular"
        size={48}
        lineHeight={40}
      >
        {Numbers.max(0, timer / 1000.0).toFixed(0)}...
      </Span>
    </Div>
  );
};

const CrashPending = () => {
  
  const dispatch = useDispatch();
  useInterval(() => {
    const newChartLine = Crash.createCrashEvent(false);
    dispatch(addCrashEvent(newChartLine));
  }, 250);

  return null;
};
