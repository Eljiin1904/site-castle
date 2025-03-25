import { useState } from "react";
import { SiteBetScope } from "@core/types/site/SiteBetScope";
import { Div } from "@client/comps/div/Div";
import { Site } from "#app/services/site";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetManager } from "./BetManager";
import { BetCardPlaceholder } from "./BetCard";
import { BetNav } from "./BetNav";
import { BetHeader } from "./BetHeader";
import "./BetBoard.scss";
import { BetRow } from "./BetRow";
import { HistoryOverlay } from "./HistoryOverlay";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { SiteGame } from "@core/types/site/SiteGame";

export const BetBoard = ({title, game = 'all'}: {title: string, game?: SiteGame | 'all'}) => {
  const [scope, setScope] = useState<SiteBetScope>("all");
  const bets = useAppSelector((x) => x.site.bets);

  const filteredBets = bets?.filter(b => game === 'all' || b.game === game) || [];
  return (
    <Div
      className="BetBoard"
      fx
      column
      gap={24}
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
