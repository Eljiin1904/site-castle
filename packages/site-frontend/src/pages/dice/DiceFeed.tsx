import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgLive } from "@client/svgs/common/SvgLive";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { DiceFeedCard } from "./DiceFeedCard";
import "./DiceFeed.scss";

export const DiceFeed = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const diceFeed = useAppSelector((x) => x.dice.feed);

  return (
    <Div
      className="DiceFeed"
      column
      fx
      gap={20}
      mt={layout === "mobile" ? undefined : 8}
    >
      <PageTitle
        icon={SvgLive}
        heading="Live Games"
      />
      <Div
        className="card-grid"
        fx
        gap={2}
        overflow="hidden"
      >
        {diceFeed.map((roll) => (
          <DiceFeedCard
            key={roll._id}
            roll={roll}
          />
        ))}
      </Div>
    </Div>
  );
};
