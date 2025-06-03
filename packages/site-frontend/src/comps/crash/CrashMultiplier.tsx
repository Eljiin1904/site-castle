import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Crash } from "@core/services/crash";
import { Numbers } from "@core/services/numbers";
import './CrashSimulator.scss';

export const CrashMultiplier = ({multiplier}:{multiplier: number}) => {

  return (<Div
    className="CrashSimulator"
    zIndex={10}
    column
  >
    <Div gap={8}>
        <Span
          className="Multiplier"
          family="number"
          color="bright-green"
          fontWeight="bold"
          textAlign="right"
          >
          {Numbers.floor(multiplier, 2).toFixed(2)}
        </Span>
        <Span
          family="title"
          weight="regular"
          size={40}
          lineHeight={40}
          color="bright-green"
          right={0}
          >
          X
        </Span>
    </Div>
    <NetGain multiplier={multiplier}/>
  </Div>);
};

const NetGain = ({multiplier}: {multiplier:number}) => {

  const userId = useAppSelector((x) => x.user._id);
  const ticket = useAppSelector((x) => x.crash.tickets.find(x => x.user.id === userId));
  const {t} = useTranslation(["games\\crash"]);
  
  if(!ticket)
    return null;

  const multiplyBy = ticket.cashoutTriggered ? ticket.multiplierCrashed : multiplier;
  const amount =  Crash.getProfit({betAmount: ticket.betAmount ?? 1, multiplier: multiplyBy ?? 0});

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