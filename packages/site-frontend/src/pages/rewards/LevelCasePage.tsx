import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Errors } from "@client/services/errors";
import { PageLoading } from "@client/comps/page/PageLoading";
import { PageNotice } from "@client/comps/page/PageNotice";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Rewards } from "#app/services/rewards";
import { LevelCaseManager } from "./level-case/LevelCaseManager";

export const LevelCasePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: [slug],
    queryFn: () => Rewards.getLevelCase({ slug: slug! }),
  });

  const chest = query.data?.chest;

  let bodyContent;

  if (query.error) {
    bodyContent = (
      <PageNotice
        image="/graphics/notice-chicken-error"
        title="Error"
        message="Something went wrong, please return to the case index."
        buttonLabel="Back to Cases"
        description={Errors.getMessage(query.error)}
        onButtonClick={() => navigate("/rewards/cases")}
      />
    );
  } else if (chest === undefined) {
    bodyContent = <PageLoading />;
  } else {
    bodyContent = <LevelCaseManager chest={chest} />;
  }

  return (
    <SitePage
      className="LevelCasePage"
      title="Level Up Cases"
    >
      {bodyContent}
    </SitePage>
  );
};
