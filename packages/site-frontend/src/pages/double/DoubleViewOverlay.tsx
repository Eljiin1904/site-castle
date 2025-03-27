import { useState } from "react";
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
import "./DoubleViewOverlay.scss";

export const DoubleViewOverlay = () => {
  const status = useAppSelector((x) => x.double.round.status);
  if (status !== "waiting" && status !== "pending") {
    return null;
  }
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
        value={status}
        waiting={<DoubleCountdown />}
        pending={<DoublePending />}
      />
    </Div>
  );
};

const DoubleCountdown = () => {
  const {t} = useTranslation(["games\\double"]);
  const statusDate = useAppSelector((x) => x.double.round.statusDate);
  const getRemainder = () => 15000 - Site.timeSince(statusDate);
  const [timer, setTimer] = useState(getRemainder());
  
  useInterval(() => {
    setTimer(getRemainder());
  }, 200);

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
      <Span color="light-sand" size={16} weight="medium" lineHeight={24}>{t('games\\double:placeYourBet')}</Span>
      <Span
        family="title"
        weight="regular"
        size={48}
        lineHeight={40}
        color="light-sand"
      >
        {Numbers.max(0, Math.ceil(timer / 1000))}
      </Span>
    </Div>
  );
};

const DoublePending = () => {
  const eosBlockNum = useAppSelector((x) => x.double.round.eosBlockNum);

  return (
    <Div
      column
      center
      gap={4}
    >
      <Span size={12}>{"Awaiting EOS Block"}</Span>
      <Link
        type="a"
        href={Random.getBlockUrl(eosBlockNum)}
        fontWeight="semi-bold"
        fontSize={15}
        color="light-blue"
      >
        {`#${eosBlockNum}`}
      </Link>
    </Div>
  );
};