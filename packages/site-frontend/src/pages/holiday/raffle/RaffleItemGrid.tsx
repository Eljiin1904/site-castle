import { RaffleState } from "@core/types/rewards/RaffleState";
import { Div } from "@client/comps/div/Div";
import { RaffleItemCard } from "./RaffleItemCard";

export const RaffleItemGrid = ({ raffle }: { raffle: RaffleState }) => {
  const { items } = raffle;

  return (
    <Div
      fx
      fy
      flow="row-wrap"
      gap={2}
    >
      {items.map((x, i) => (
        <RaffleItemCard
          key={x.id}
          index={i}
          raffle={raffle}
        />
      ))}
    </Div>
  );
};
