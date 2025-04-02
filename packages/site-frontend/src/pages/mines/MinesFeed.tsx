import { Div } from "#client/comps/div/Div";
import { PageTitle } from "#client/comps/page/PageTitle";
import { SvgLive } from "#client/svgs/common/SvgLive";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { MinesFeedCard } from "./MinesFeedCard";
import "./MinesFeed.scss";

export const MinesFeed = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const feed = useAppSelector((x) => x.mines.feed);

  return (
    <Div
      className="MinesFeed"
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
        {feed.map((event) => (
          <MinesFeedCard
            key={event._id}
            event={event}
          />
        ))}
      </Div>
    </Div>
  );
};
