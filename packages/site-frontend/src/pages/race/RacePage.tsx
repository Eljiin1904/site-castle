import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";
import { PageLoading } from "@client/comps/page/PageLoading";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Rewards } from "#app/services/rewards";
import { LeaderGrid } from "./LeaderGrid";
import { RaceBanner } from "./RaceBanner";
import { useParams } from "react-router-dom";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Img } from "@client/comps/img/Img";

export const RacePage = () => {
  
  const small = useIsMobileLayout();
  const {t} = useTranslation(["pages/race", "notices/racesError"]);
  const { slug } = useParams<{ slug: string }>();
  const query = useQuery({
    queryKey: ["race", slug],
    queryFn: () => Rewards.getActiveRace({ slug: slug! }),
    placeholderData: (prev) => prev,
  });

  const race = query.data?.state;

  let content;
  if (query.error) {
    content = (
     <PageNotice
        image="/graphics/notice-castle-404"
        title={t("notices/racesError:title")}
        message={t('notices/racesError:message')}
        buttonLabel={t("notices/racesError:buttonLabel")}
        small={small}
        onButtonClick={query.refetch}
        description={Errors.getMessage(query.error)}
      >
        <Fragment>
          <Img  type="png" path='/graphics/404/diamond' style={{top:"-10px", left:"-65px"}} width={"120px"} position="absolute"/>
          <Img  type="png" path='/graphics/404/coins' style={{bottom:"-50px", right:"-40px"}} width={"140px"} position="absolute"/>
        </Fragment>
      </PageNotice>
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
      title={t('title')}
    >
      {content}
    </SitePage>
  );
};
