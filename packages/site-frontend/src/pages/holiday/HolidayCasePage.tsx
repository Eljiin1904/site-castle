import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Errors } from "@client/services/errors";
import { PageLoading } from "@client/comps/page/PageLoading";
import { PageNotice } from "@client/comps/page/PageNotice";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Rewards } from "#app/services/rewards";
import { HolidayCaseManager } from "./case/HolidayCaseManager";

export const HolidayCasePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: [slug],
    queryFn: () => Rewards.getHolidayCase({ slug: slug! }),
  });

  let bodyContent;

  if (query.error) {
    bodyContent = (
      <PageNotice
        image="/graphics/notice-chicken-error"
        title="Error"
        message="Something went wrong, please return to the event page."
        buttonLabel="Back to Event"
        description={Errors.getMessage(query.error)}
        onButtonClick={() => navigate("/holiday")}
      />
    );
  } else if (!query.data) {
    bodyContent = <PageLoading />;
  } else {
    bodyContent = (
      <HolidayCaseManager
        chest={query.data.chest}
        holidayCost={query.data.holidayCost}
      />
    );
  }

  return (
    <SitePage
      className="HolidayCasePage"
      title="Holiday Cases"
    >
      {bodyContent}
    </SitePage>
  );
};
