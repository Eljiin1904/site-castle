import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { DiceFeedCard } from "./DiceFeedCard";
import { ButtonGroup } from "@client/comps/button/ButtonGroup";
import { DiceFeedHeader } from "./DiceFeedHeader";
import { DiceHistoryOverlay } from "./DiceHistoryOverlay";
import "./DiceFeed.scss";

export const DiceFeed = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const diceFeed = useAppSelector((x) => x.dice.feed);
  return (
    <Div
      className="DiceFeed"
      column
      fx
      gap={24}
      mt={layout === "mobile" ? undefined : 56}
      px={layout === "mobile" ? 20 : undefined}
    >
      <PageTitle
        heading="DICE GAME BETS"
        mb={16}
      />
      <ButtonGroup
          options={["About", "All Bets","High Rollers","Lucky Bets"]}
          size="md"
          labelSize={12}
          gap={16}
          value={["about", "all", "high", "lucky"].indexOf("all")}  
          setValue={(x) => console.log(x)}
        />
      <Div
       column
        fx
        overflow="hidden"
      >
        {diceFeed.length > 0 && <DiceFeedHeader />}
        {diceFeed.map((roll) => (
          <DiceFeedCard
            key={roll._id}
            roll={roll}
          />
        ))}
        {diceFeed.length > 9 && <DiceHistoryOverlay />}
      </Div>
    </Div>
  );
};