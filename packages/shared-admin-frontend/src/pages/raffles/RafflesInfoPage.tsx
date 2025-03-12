import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Div } from "@client/comps/div/Div";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";
import { PageLoading } from "@client/comps/page/PageLoading";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Rewards } from "#app/services/rewards";
import { InfoItemGrid } from "./info/InfoItemGrid";
import { InfoMenu } from "./info/InfoMenu";
import { InfoHeader } from "./info/InfoHeader";

export const RafflesInfoPage = () => {
  const { raffleId } = useParams<{ raffleId: string }>();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["raffle", raffleId],
    queryFn: () => Rewards.getRaffle({ raffleId: raffleId! }),
  });

  const raffle = query.data?.raffle;

  let content;

  if (query.error) {
    content = (
      <PageNotice
        image="/graphics/notice-Chicken-error"
        title="Error"
        message="Something went wrong, please return to the raffle index."
        buttonLabel="Back to Raffles"
        description={Errors.getMessage(query.error)}
        onButtonClick={() => navigate("/raffles")}
      />
    );
  } else if (raffle === undefined) {
    content = <PageLoading />;
  } else {
    content = (
      <Fragment>
        <InfoHeader
          isLoading={query.isLoading}
          onRefreshClick={query.refetch}
        />
        <Div gap={24}>
          <InfoMenu raffle={raffle} />
          <InfoItemGrid items={raffle.items} />
        </Div>
      </Fragment>
    );
  }

  return (
    <SitePage
      className="RafflesInfoPage"
      title="Raffles"
    >
      {content}
    </SitePage>
  );
};
