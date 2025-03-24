import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { DoubleFeedHeader } from "./DoubleFeedHeader";
import { BetNav } from "#app/comps/bet-board/BetNav";
import { SiteBetScope } from "@core/types/site/SiteBetScope";
import { useState } from "react";
import { HistoryOverlay } from "#app/comps/bet-board/HistoryOverlay";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { DoubleFeedRow } from "./DoubleFeedRow";

export const DoubleFeed = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const doubleFeed = useAppSelector((x) => x.double.tickets);
  const [scope, setScope] = useState<SiteBetScope>("all");
  const {t} = useTranslation(["games\\double"])
  return (
    <Div
      className="DoubleFeed"
      column
      fx
      gap={24}
      mt={layout === "mobile" ? 40 : 56}
      px={layout === "mobile" ? 20 : undefined}
    >
      <BetNav
        heading={t("games\\double:betBoardHeader")}
        scope={scope}
        setScope={setScope}
      />
      <Div
       column
        fx
        overflow="hidden"
      >
        {doubleFeed.length > 0 && <DoubleFeedHeader />}
        {doubleFeed.map((roll) => (
          <DoubleFeedRow key={roll._id} roll={roll} />
        ))}
        {doubleFeed.length > 9 && <HistoryOverlay />}
      </Div>
    </Div>
  );
};