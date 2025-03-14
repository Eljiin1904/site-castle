import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { DiceFeedHeader } from "./DiceFeedHeader";
import "./DiceFeed.scss";
import { BetNav } from "#app/comps/bet-board/BetNav";
import { SiteBetScope } from "@core/types/site/SiteBetScope";
import { useState } from "react";
import { DiceFeedRow } from "./DiceFeedRow";
import { HistoryOverlay } from "#app/comps/bet-board/HistoryOverlay";

export const DiceFeed = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const diceFeed = useAppSelector((x) => x.dice.feed);
  const [scope, setScope] = useState<SiteBetScope>("all");

  return (
    <Div
      className="DiceFeed"
      column
      fx
      gap={24}
      mt={layout === "mobile" ? 40 : 56}
      px={layout === "mobile" ? 20 : undefined}
    >
      <BetNav
        heading="Dice Game Bets"
        scope={scope}
        setScope={setScope}
      />
      <Div
       column
        fx
        overflow="hidden"
      >
        {diceFeed.length > 0 && <DiceFeedHeader />}
        {diceFeed.map((roll) => (
          <DiceFeedRow key={roll._id} roll={roll} />
        ))}
        {diceFeed.length > 9 && <HistoryOverlay />}
      </Div>
    </Div>
  );
};