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

  if(lobby)
    return null;

  return (<MemoizedMultiplier startedTime={roundStartedTime} />);
};

const Multiplier = ({startedTime}: {startedTime: number}) => {

  const [multiplier, setMultiplier] = useState(1.00);
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
    <Div column gap={16} alignItems="flex-end">
      <Div gap={4} justifyContent="flex-end" width={160}>
        <Span
          family="title"
          weight="regular"
          size={48}
          lineHeight={40}
          color="bright-green"
          pr={40}
          style={{width: `${multiplier < 10 ? `120` : (multiplier < 100 ? `140`: `165`)}px`}}
          textAlign="left"
          >
          {multiplier}
        </Span>
        <Span
          family="title"
          weight="regular"
          size={48}
          lineHeight={40}
          color="bright-green"
          position="absolute"
          >
          X
        </Span>
      </Div>
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

  return (<Div gap={4}>
    <Span
      family="title"
      weight="regular"
      size={16}
      lineHeight={40}
      color="light-sand"
      textTransform="uppercase"
    > {t('netGain')} </Span>
    <Tokens value={amount} family="title" fontSize={16}/>
    </Div>);    
};

const SpanMultiplier = ({text, width}: {text: number | string, width?: Unit | undefined}) => {

  return (<Span
    family="title"
    weight="regular"
    size={48}
    lineHeight={40}
    color="bright-green"
    pr={40}
    >
    {text}
  </Span>)
}
