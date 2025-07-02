import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Numbers } from "@core/services/numbers";
import './CrashSimulator.scss';
import { Fragment, useEffect, useState } from "react";
import { Img } from "@client/comps/img/Img";

export const CrashedSimulator = () => {
  const userId = useAppSelector((x) => x.user._id);
  const roundTicket = useAppSelector((x) => x.crash.tickets.find((x) => x.user.id === userId));
  const {t} = useTranslation(["games\\crash"]);
  const won = roundTicket?.won ?? false;
  const cashoutMultiplier = roundTicket?.multiplierCrashed ?? 1;
  const round = useAppSelector((x) => x.crash.round);
  const [animation, setAnimation] = useState(true);


  useEffect(() => {

    setTimeout(() => {
      setAnimation(false);
    }
    , 40);
  }, []);
  
  if(animation)
    return (<Div fx fy bg="white" position="absolute" left={0} top={0} zIndex={12} style={{opacity:1}} />);
  
  if(!round.multiplier)
    return null;

  return (<Fragment>
    {!won && <Img type="gif" right={20} bottom={0} style={{transform: "scaleX(-1)"}} position="absolute" path="/graphics/games/crash/crashed" width={"150px"} />}
    <Div
      className="CrashSimulator"
      zIndex={10}
      column
    >
      <Div gap={8}>
          <Span
            className="Multiplier"
            family="number"
            color={won ? "bright-green" : "double-red"}
            textAlign="right"
            >
            {Numbers.floor(round.multiplier, 2).toFixed(2)}
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
    </Div>
    </Fragment>);
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