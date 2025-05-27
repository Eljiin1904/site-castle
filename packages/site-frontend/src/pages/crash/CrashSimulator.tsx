import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import React, { useState } from "react";
import { useInterval } from "usehooks-ts";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useTranslation } from "@core/services/internationalization/internationalization";
import './CrashSimulator.scss';
import { Crash } from "@core/services/crash";

export const CrashSimulator = () => {
  
  const lobby = useAppSelector((x) => x.crash.lobby);
  const roundStartedTime = useAppSelector((x) => x.crash.roundElapsedTime) ?? 0;
  //const elapsedTime = roundStartedTime ? Date.now() - roundStartedTime : 0;
  // const [multiplier, setMultiplier] = useState(serverMultiplier);
  // const [timer, setTimer] = useState(elapsedTime);
 
  // useInterval(() => {
  //   if (timer > 0) {
  //     const currentMultiplier = Crash.getMultiplierForTime(timer);
  //     setMultiplier(currentMultiplier);
  //   }
  //   setTimer(elapsedTime + 100);
  // }, 50);

  if(lobby)
    return null;

  return (<MemoizedMultiplier startedTime={roundStartedTime} />);
};

const Multiplier = ({startedTime}: {startedTime: number}) => {

  const [multiplier, setMultiplier] = useState(1);
  const [timer, setTimer] = useState(startedTime);
  
  useInterval(() => {
    if (timer > 0) {
      const currentMultiplier = Crash.getMultiplierForTime(timer);
      setMultiplier(currentMultiplier);
    }
    setTimer(currentVal => currentVal + 50);
  }, 50);

  return (<Div
    className="CrashSimulator"
    column
    center
    zIndex={10}
    fx
    fy
    gap={12}
  >
    <Div column gap={16}>
      <Span
        family="title"
        weight="regular"
        size={48}
        lineHeight={40}
        color="bright-green"
      >
        {multiplier}X
      </Span>
      <NetGain />
    </Div>
  </Div>)
};

const MemoizedMultiplier = React.memo(Multiplier, (prevProps, nextProps) => {
  return prevProps.startedTime === nextProps.startedTime;
});

const NetGain = () => {

  const userId = useAppSelector((x) => x.user._id);
  const currentMultiplier = useAppSelector((x) => x.crash.round.multiplier);
  const ticket = useAppSelector((x) => x.crash.tickets.find(x => x.user.id === userId));
  const {t} = useTranslation(["games\\crash"]);
  
  if(!ticket)
    return null;

  const multiplyBy = ticket.cashoutTriggered ? ticket.multiplierCrashed : currentMultiplier;
  const amount = Crash.getProfit({betAmount: ticket.betAmount ?? 1, multiplier: multiplyBy ?? 0});

  if(amount === 0)
    return null;

  return (<Div gap={8}>
    <Span
      family="title"
      weight="regular"
      size={16}
      lineHeight={40}
      color="light-sand"
      textTransform="uppercase"
    > {t('netGain')} </Span>
    <Tokens value={amount} />
    </Div>);    
};
