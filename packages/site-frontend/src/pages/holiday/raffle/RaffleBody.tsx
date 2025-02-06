import { Fragment, useState } from "react";
import { isPast, isFuture } from "date-fns";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { RaffleItemGrid } from "./RaffleItemGrid";
import { RaffleHeader } from "./RaffleHeader";
import { RaffleEffects } from "./RaffleEffects";

export const RaffleBody = () => {
  const raffles = useAppSelector((x) => x.holiday.raffles);

  const initIndex = raffles.findIndex(
    (x) =>
      isPast(x.startDate) &&
      (isFuture(x.endDate) ||
        ["starting", "pending", "drawing"].includes(x.status)),
  );

  const [raffleIndex, setRaffleIndex] = useState(
    initIndex === -1 ? 0 : initIndex,
  );

  const raffle = raffles[raffleIndex];

  return (
    <Fragment>
      <RaffleHeader
        raffleIndex={raffleIndex}
        setRaffleIndex={setRaffleIndex}
      />
      <RaffleItemGrid raffle={raffle} />
      <RaffleEffects raffle={raffle} />
    </Fragment>
  );
};
