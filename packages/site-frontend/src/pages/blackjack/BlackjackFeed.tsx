import { Div } from "#client/comps/div/Div";
import { PageTitle } from "#client/comps/page/PageTitle";
import { SvgLive } from "#client/svgs/common/SvgLive";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./BlackjackFeed.scss";
import { BlackjackFeedCard } from "./BlackjackFeedCard";
// import { useTranslation } from "#client/hooks/localization/useTranslation";

export const BlackjackFeed = () => {
  // const { t } = useTranslation();
  const layout = useAppSelector((x) => x.style.mainLayout);
  const feed = useAppSelector((x) => x.blackjack.feed);

  return (
    <Div
      className="BlackjackFeed"
      column
      fx
      gap={20}
      mt={layout === "mobile" ? undefined : 8}
    >
      <PageTitle
        icon={SvgLive}
        heading={"Live Games"}
      />
      <Div
        className="card-grid"
        fx
        gap={2}
        overflow="hidden"
      >
        {feed.map((card) => (
          <BlackjackFeedCard
            key={card._id}
            card={card}
          />
        ))}
      </Div>
    </Div>
  );
};
