import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Errors } from "@client/services/errors";
import { PageLoading } from "@client/comps/page/PageLoading";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Cases } from "#app/services/cases";
import { SitePage } from "#app/comps/site-page/SitePage";
import { PlayerManager } from "./player/PlayerManager";

export const CasePlayerPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: [slug],
    queryFn: () => Cases.getCase({ slug: slug! }),
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
        onButtonClick={() => navigate("/cases")}
      />
    );
  } else if (chest === undefined) {
    bodyContent = <PageLoading />;
  } else {
    bodyContent = <PlayerManager chest={chest} />;
  }

  return (
    <SitePage
      className="CasePlayerPage"
      title="Cases"
    >
      {bodyContent}
    </SitePage>
  );
};
