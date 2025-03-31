import { useState } from "react";
import { SiteBetScope } from "@core/types/site/SiteBetScope";
import { Div, DivProps } from "@client/comps/div/Div";
import { Site } from "#app/services/site";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetManager } from "./BetManager";
import { BetCardPlaceholder } from "./BetCard";
import { BetNav } from "./BetNav";
import { BetHeader } from "./BetHeader";
import { BetRow } from "./BetRow";
import { HistoryOverlay } from "./HistoryOverlay";
import { SiteGame } from "@core/types/site/SiteGame";
import { BetData } from "#app/services/site/Site";
import "./BetBoard.scss";

export type BetBoardProps = DivProps & {
  title: string;
  game?: SiteGame | 'all';
};

export const BetBoard = ({title, game = 'all',  ...forwardProps}: BetBoardProps) => {
  
  const [scope, setScope] = useState<SiteBetScope>("all");
  const bets = useAppSelector((x) => x.site.bets);
  
  let filteredBets:BetData[] = [];
  switch (game) {
    case 'dice':
      filteredBets = bets?.dice || [];
      break;
    case 'double':
      filteredBets = bets?.double || [];
      break;
    case 'limbo':
      filteredBets = bets?.limbo || [];
      break;
    case 'cases':
      filteredBets = bets?.cases || [];
      break;
    case 'case-battles':
      filteredBets = [];
      break;
    default:
      filteredBets = bets?.all || [];
      break;
  }
  
  return (
    <Div
      className="BetBoard"
      fx
      column
      gap={24}
      {...forwardProps}
    >
      <BetManager scope={scope} />
      <BetNav
        heading={title}
        scope={scope}
        setScope={setScope}
      />
     {filteredBets ? <>
      <Div fx column>
        <BetHeader game={game} />
        {filteredBets.map((x) => (
            <BetRow
            key={`${scope}-${x._id}`}
            bet={x}
            inserted={x.inserted}
            animate
            game={game}
          />
        ))}
      </Div>
      {filteredBets.length > 9 && <HistoryOverlay />}
    </>: [...Array(Site.betLogSize)].map((x, i) => (
          <BetCardPlaceholder key={i} />
        ))}
    </Div>
  );
};