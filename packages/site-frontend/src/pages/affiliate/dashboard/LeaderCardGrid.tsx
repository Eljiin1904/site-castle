import { AffiliateLeader } from "@core/types/affiliates/AffiliateLeader";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LeaderCard, LeaderCardPlaceholder } from "./LeaderCard";

export const LeaderCardGrid = ({
  leaders,
}: {
  leaders: AffiliateLeader[] | undefined;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Div
      gap={16}
      flow={layout === "mobile" ? "row-wrap" : "row"}
    >
      {!leaders &&
        [...Array(5)].map((x, i) => <LeaderCardPlaceholder key={i} />)}
      {leaders &&
        leaders.map((x) => (
          <LeaderCard
            key={x.user.id}
            leader={x}
          />
        ))}
    </Div>
  );
};
