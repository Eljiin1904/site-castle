import { useState } from "react";
import { SiteBetScope } from "@core/types/site/SiteBetScope";
import { Div } from "@client/comps/div/Div";
import { Site } from "#app/services/site";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetManager } from "./BetManager";
import { BetCard, BetCardPlaceholder } from "./BetCard";
import { BetNav } from "./BetNav";
import { BetHeader } from "./BetHeader";
import "./BetBoard.scss";

export const BetBoard = () => {
  const [scope, setScope] = useState<SiteBetScope>("all");
  const bets = useAppSelector((x) => x.site.bets);

  return (
    <Div
      className="BetBoard"
      fx
      column
      gap={8}
    >
      <BetManager scope={scope} />
      <BetNav
        scope={scope}
        setScope={setScope}
      />
      <BetHeader />
      <Div
        className="card-grid"
        fx
        column
        gap={8}
        overflow="hidden"
      >
        {bets
          ? bets.map((x) => (
              <BetCard
                key={`${scope}-${x._id}`}
                bet={x}
                inserted={x.inserted}
                animate
              />
            ))
          : [...Array(Site.betLogSize)].map((x, i) => (
              <BetCardPlaceholder key={i} />
            ))}
      </Div>
    </Div>
  );
};
