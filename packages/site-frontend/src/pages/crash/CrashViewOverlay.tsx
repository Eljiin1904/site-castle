import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { Numbers } from "@core/services/numbers";
import { Random } from "@core/services/random";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Link } from "@client/comps/link/Link";
import { Site } from "#app/services/site";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const CrashViewOverlay = () => {
  const round = useAppSelector((x) => x.crash.round);
  const [multiplier, setMultiplier] = useState(0);
  
  useEffect(() => {
    
    if(round.status === "waiting") {

      setMultiplier(1);
    }
  }, [round._id, round.status]);

  return (
    <Div
      className="DoubleViewOverlay"
      position="absolute"
      left={0}
      right={0}
      top={0}
      bottom={0}
      center
    >
      <Div className="background" />
      <Conditional
        value={round.status}
        waiting={<CrashCountdown />}
        pending={<CrashPending />}
        simulating={<CrashSimulating />}
        completed={<CrashCompleted/>}
      />
    </Div>
  );
};

const CrashCountdown = () => {
  
  const statusDate = useAppSelector((x) => x.crash.round.statusDate);
  const getRemainder = () => 7000 - Site.timeSince(statusDate);
  const [timer, setTimer] = useState(getRemainder());

  useInterval(() => {
    setTimer(getRemainder());
  }, 50);

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
        Starting in
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
  const { t } = useTranslation(["games\\double"]);
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
      color="light-sand"
        size={16}
        weight="medium"
        lineHeight={24}
      >{t("games\\crash:ready")}</Span>
      
    </Div>
  );
};

const CrashSimulating = () => {
  
  const lobby = useAppSelector((x) => x.crash.lobby);
  const elapsedTime = useAppSelector((x) => x.crash.round.elapsedTime);
  const serverMultiplier = useAppSelector((x) => x.crash.round.multiplier);
  const [multiplier, setMultiplier] = useState(serverMultiplier);
  const [timer, setTimer] = useState(elapsedTime);
  
  useInterval(() => {
    if (timer > 0) {
      const currentMultiplier = 1.0024 * Math.pow(1.0718, timer / 1000);
      setMultiplier(currentMultiplier);
    }
    setTimer(elapsedTime + 100);
  }, 100);

  if(multiplier === 0 || lobby)
    return null;

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
        family="title"
        weight="regular"
        size={48}
        lineHeight={40}
        color="bright-green"
      >
        {multiplier.toFixed(2)}X
      </Span>
    </Div>
  );
};

const CrashCompleted = () => {
  const roundMultiplier = useAppSelector((x) => x.crash.round.multiplierCrash);

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
        family="title"
        weight="regular"
        size={48}
        lineHeight={40}
        color="double-red"
      >
      {roundMultiplier?.toFixed(2)}X
      </Span>
    </Div>
  );
};
