import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Errors } from "@client/services/errors";
import { PageLoading } from "@client/comps/page/PageLoading";
import { PageNotice } from "@client/comps/page/PageNotice";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Rewards } from "#app/services/rewards";
import { GemCaseManager } from "./gem-case/GemCaseManager";

export const GemCasePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: [slug],
    queryFn: () => Rewards.getGemCase({ slug: slug! }),
  });

  let bodyContent;

  if (query.error) {
    bodyContent = (
      <PageNotice
        image="/graphics/notice-chicken-error"
        title="Error"
        message="Something went wrong, please return to the store."
        buttonLabel="Back to Store"
        description={Errors.getMessage(query.error)}
        onButtonClick={() => navigate("/rewards/gems")}
      />
    );
  } else if (!query.data) {
    bodyContent = <PageLoading />;
  } else {
    bodyContent = (
      <GemCaseManager
        chest={query.data.chest}
        gemCost={query.data.gemCost}
      />
    );
  }

  return (
    <SitePage
      className="GemCasePage"
      title="Gem Cases"
    >
      {bodyContent}
    </SitePage>
  );
};
