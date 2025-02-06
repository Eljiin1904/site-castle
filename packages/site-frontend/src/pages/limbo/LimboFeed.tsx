import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgLive } from "@client/svgs/common/SvgLive";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LimboFeedCard } from "./LimboFeedCard";
import "./LimboFeed.scss";

export const LimboFeed = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const limboFeed = useAppSelector((x) => x.limbo.feed);

  return (
    <Div
      className="LimboFeed"
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
        {limboFeed.map((roll) => (
          <LimboFeedCard
            key={roll._id}
            roll={roll}
          />
        ))}
      </Div>
    </Div>
  );
};
