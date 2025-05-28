import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Numbers } from "@core/services/numbers";
import './CrashSimulator.scss';

export const CrashedSimulator = () => {
  const userId = useAppSelector((x) => x.user._id);
  const roundTicket = useAppSelector((x) => x.crash.tickets.find((x) => x.user.id === userId));
  const {t} = useTranslation(["games\\crash"]);
  const won = roundTicket?.won ?? false;
  const cashoutMultiplier = roundTicket?.multiplierCrashed ?? 1;
  const round = useAppSelector((x) => x.crash.round);

  if(!round?.multiplierCrash)
    return null;
  
  return (<Div
      className="CrashSimulator"
      zIndex={10}
      column
    >
      <Div gap={8}>
          <Span
            className="Multiplier"
            family="number"
            color={won ? "bright-green" : "double-red"}
            fontWeight="bold"
            textAlign="right"
            >
            {Numbers.floor(round.multiplierCrash, 2).toFixed(2)}
          </Span>
          <Span
            family="title"
            weight="regular"
            size={40}
            lineHeight={40}
            color={won ? "bright-green" : "double-red"}
            right={0}
            >
            X
          </Span>
      </Div>
      {won ? <TookProfit multiplier={Numbers.floor(cashoutMultiplier, 2).toFixed(2)} /> :
        <Span
        family="title"
        weight="regular"
        size={16}
        lineHeight={24}
        color="double-red"
        textTransform="uppercase"
        textAlign="left"
      > {t('rugged')}
      </Span>}
    </Div>);
};

const TookProfit = ({multiplier}: {multiplier:string}) => {

  const {t} = useTranslation(["games\\crash"]);

  return (<Div gap={4}>
    <Span
      family="title"
      weight="regular"
      size={16}
      lineHeight={40}
      color="light-sand"
      textTransform="uppercase"
    > {t('tookProfit')} </Span>
    <Span
      family="title"
      weight="regular"
      size={16}
      lineHeight={40}
      color="bright-green"
      textTransform="uppercase"
      textAlign="left"
    > {multiplier}X
    </Span>
    </Div>);    
};