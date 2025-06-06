import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Numbers } from "@core/services/numbers";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

export const CrashCountdown = ({time}:{time:number}) => {
  
  const [timer, setTimer] = useState(time);
  const {t} = useTranslation(["games\\crash"]);

  useInterval(() => {
   if(timer > 0) {
    setTimer(currentVal => currentVal - 500);
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