import { Crash } from "#app/services/crash";
import { addCrashEvent } from "#app/services/crash/Crash";
import { CrashEventProps } from "#app/types/crash/CrashEventProps";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Numbers } from "@core/services/numbers";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useInterval } from "usehooks-ts";

export const CrashCountdown = ({events, time}:{events: CrashEventProps[] ,time:number}) => {
  
  const [timer, setTimer] = useState(time);
  const {t} = useTranslation(["games\\crash"]);
  const dispatch = useDispatch();

  useInterval(() => {
   if(timer > 0) {
    setTimer(currentVal => currentVal - 500);
    const newChartLine = Crash.createCrashEvent(events.length == 0, events[events.length - 1]);
    dispatch(addCrashEvent(newChartLine));
   }
  }, 500);

  return (
    <Div
      column
      center
      zIndex={10}
      fx
      fy
      gap={12}
     position="absolute"
     left={0}
     bottom={0}
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