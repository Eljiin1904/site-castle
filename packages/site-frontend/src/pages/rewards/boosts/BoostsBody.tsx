import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";
import { Dialogs } from "@client/services/dialogs";
import { Rewards } from "#app/services/rewards";
import { RewardBoostModal } from "#app/modals/rewards/RewardBoostModal";
import { BoostsBanner } from "./BoostsBanner";
import { BoostGrid } from "./BoostGrid";

export const BoostsBody = () => {
  const query = useQuery({
    queryKey: ["reward-boost-dates"],
    queryFn: () => Rewards.getBoostDates(),
  });

  if (query.error) {
    return (
      <PageNotice
        image="/graphics/notice-chicken-error"
        title="Error"
        message="Something went wrong, please refetch page."
        buttonLabel="Refetch Page"
        description={Errors.getMessage(query.error)}
        onButtonClick={query.refetch}
      />
    );
  }

  return (
    <Fragment>
      <BoostsBanner />
      <BoostGrid
        dates={query.data}
        onClaimClick={(x) =>
          Dialogs.open(
            "primary",
            <RewardBoostModal
              timeframe={x}
              onSuccess={query.refetch}
            />,
          )
        }
      />
    </Fragment>
  );
};
