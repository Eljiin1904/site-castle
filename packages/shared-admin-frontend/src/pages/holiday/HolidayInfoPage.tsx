import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Div } from "@client/comps/div/Div";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";
import { PageLoading } from "@client/comps/page/PageLoading";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Rewards } from "#app/services/rewards";
import { InfoCaseGrid } from "./info/InfoCaseGrid";
import { InfoMenu } from "./info/InfoMenu";
import { InfoHeader } from "./info/InfoHeader";

export const HolidayInfoPage = () => {
  const { holidayId } = useParams<{ holidayId: string }>();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["holiday", holidayId],
    queryFn: () => Rewards.getHoliday({ holidayId: holidayId! }),
  });

  const holiday = query.data?.holiday;

  let content;

  if (query.error) {
    content = (
      <PageNotice
        image="/graphics/notice-Chicken-error"
        title="Error"
        message="Something went wrong, please return to the holiday index."
        buttonLabel="Back to Holidays"
        description={Errors.getMessage(query.error)}
        onButtonClick={() => navigate("/holidays")}
      />
    );
  } else if (holiday === undefined) {
    content = <PageLoading />;
  } else {
    content = (
      <Fragment>
        <InfoHeader
          isLoading={query.isLoading}
          onRefreshClick={query.refetch}
        />
        <Div gap={24}>
          <InfoMenu holiday={holiday} />
          <InfoCaseGrid chests={holiday.chests} />
        </Div>
      </Fragment>
    );
  }

  return (
    <SitePage
      className="HolidayInfoPage"
      title="Holidays"
    >
      {content}
    </SitePage>
  );
};
