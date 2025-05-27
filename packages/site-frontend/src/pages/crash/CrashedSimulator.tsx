import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";
import './CrashSimulator.scss';

export const CrashedSimulator = () => {
  const roundMultiplier = useAppSelector((x) => x.crash.round.multiplierCrash) ?? 0;
  const userId = useAppSelector((x) => x.user._id);
  const roundTicket = useAppSelector((x) => x.crash.tickets.find((x) => x.user.id === userId));
  const {t} = useTranslation(["games\\crash"]);
  const won = roundTicket?.won ?? false;
  const cashoutMultiplier = roundTicket?.multiplierCrashed ?? 1;
  
  return (
    <Div
      className="CrashSimulator"
      column
      center
      zIndex={10}
      fx
      fy
      gap={12}
    >
      <Div column gap={16}>
        <Div gap={4} justifyContent="flex-end" width={160}>
        <Span
          family="title"
          weight="regular"
          size={48}
          lineHeight={40}
          color={won ? "bright-green" : "double-red"}
          pr={40}
          style={{width: `${roundMultiplier < 10 ? `120` : (roundMultiplier < 100 ? `140`: `165`)}px`}}
          textAlign="left"
          >
          {roundMultiplier}
        </Span>
        <Span
          family="title"
          weight="regular"
          size={48}
          lineHeight={40}
          color={won ? "bright-green" : "double-red"}
          position="absolute"
          >
          X
        </Span>
        </Div>
        {won ? <Div gap={8}>
          <Span
            family="title"
            weight="regular"
            size={16}
            lineHeight={24}
            textTransform="uppercase"
            textAlign="left"
            color="light-sand"
          > {t('tookProfit')}
          </Span>
          <Span
            family="title"
            weight="regular"
            size={16}
            lineHeight={24}
            color="bright-green"
            textTransform="uppercase"
            textAlign="left"
          > {cashoutMultiplier}X
          </Span>
        </Div>:
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
    </Div>
  );
};