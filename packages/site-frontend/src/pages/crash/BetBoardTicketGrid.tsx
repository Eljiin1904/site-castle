import { useMemo } from "react";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetBoardTicketCard } from "./BetBoardTicketCard";

export const BetBoardTicketGrid = () => {
  const tickets = useAppSelector((x) => x.crash.tickets);
  const ItemsMemo = useMemo(
    () =>
      tickets.map((ticket) => (
        <BetBoardTicketCard
          key={ticket._id}
          ticket={ticket}
        />
      )),
    [tickets],
  );

  return (
    <Div
      fx
      column
      border
      borderColor="brown-4"
    >
      <Div column>{ItemsMemo}</Div>
    </Div>
  );
};
