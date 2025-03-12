import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RewardBoostTimeframe } from "@core/types/rewards/RewardBoostTimeframe";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Rewards } from "#app/services/rewards";
import { RewardBoostEditModal } from "#app/modals/rewards/RewardBoostEditModal";
import { RewardBoostCreateModal } from "#app/modals/rewards/RewardBoostCreateModal";
import { BoostsHeader } from "./BoostsHeader";
import { BoostsFooter } from "./BoostsFooter";
import { BoostEventTable } from "./BoostEventTable";

export const BoostsPage = () => {
  const limit = 15;
  const [timeframe, setTimeframe] = useState<RewardBoostTimeframe>();
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [timeframe]);

  const query = useQuery({
    queryKey: ["boosts", timeframe, page],
    queryFn: () => Rewards.getBoostEvents({ timeframe, page, limit }),
    placeholderData: (prev) => prev,
  });

  const events = query.data?.events || [];

  return (
    <SitePage
      className="BoostsPage"
      title="Boosts"
    >
      <BoostsHeader
        isLoading={query.isFetching}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
        onCreateClick={() =>
          Dialogs.open(
            "primary",
            <RewardBoostCreateModal onSuccess={query.refetch} />,
          )
        }
      />
      <Div
        fx
        column
      >
        <BoostEventTable
          events={events}
          isLoading={query.isLoading}
          onItemClick={(x) =>
            Dialogs.open(
              "primary",
              <RewardBoostEditModal
                event={x}
                onSuccess={query.refetch}
              />,
            )
          }
        />
        <BoostsFooter
          page={page}
          hasNext={events.length !== 0 && events.length % limit === 0}
          setPage={setPage}
        />
      </Div>
    </SitePage>
  );
};
