import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";
import { PageLoading } from "@client/comps/page/PageLoading";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Rewards } from "#app/services/rewards";
import { LeaderGrid } from "./LeaderGrid";
import { RaceBanner } from "./RaceBanner";

export const RacePage = () => {
  const query = useQuery({
    queryKey: ["race"],
    queryFn: () => Rewards.getActiveRace(),
    placeholderData: (prev) => prev,
  });

  const race = query.data?.state;

  let content;

  if (query.error) {
    content = (
      <PageNotice
        image="/graphics/notice-chicken-error"
        title="Error"
        message="Something went wrong, please refetch the race."
        buttonLabel="Refetch Race"
        description={Errors.getMessage(query.error)}
        onButtonClick={query.refetch}
      />
    );
  } else if (!race) {
    content = <PageLoading />;
  } else {
    content = (
      <Fragment>
        <RaceBanner race={race} />
        <LeaderGrid race={race} />
      </Fragment>
    );
  }

  return (
    <SitePage
      className="RacePage"
      title="Race"
    >
      {content}
    </SitePage>
  );
};
