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

export const BetBoard = () => {
  const [scope, setScope] = useState<SiteBetScope>("all");
  const bets = useAppSelector((x) => x.site.bets);
  const {t} = useTranslation();
  return (
    <Div
      className="BetBoard"
      fx
      column
      gap={24}
    >
      <BetManager scope={scope} />
      <BetNav
        heading={t("bets.recentBets")}
        scope={scope}
        setScope={setScope}
      />
     {bets ? <>
      <BetHeader />
      {bets.map((x) => (
          <BetRow
          key={`${scope}-${x._id}`}
          bet={x}
          inserted={x.inserted}
          animate
        />
      ))}
      {bets.length > 9 && <HistoryOverlay />}
    </>: [...Array(Site.betLogSize)].map((x, i) => (
          <BetCardPlaceholder key={i} />
        ))}
    </Div>
  );
};
