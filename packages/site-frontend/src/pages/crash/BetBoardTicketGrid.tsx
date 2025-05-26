import { useMemo } from "react";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetBoardTicketCard } from "./BetBoardTicketCard";
import { Vector } from "@client/comps/vector/Vector";
import { SvgActiveUsers } from "#app/svgs/crash/SvgActiveUsers";
import { Heading } from "@client/comps/heading/Heading";
import { Tokens } from "@client/comps/tokens/Tokens";
import { HistoryOverlay } from "#app/comps/bet-board/HistoryOverlay";

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

  const layout = useAppSelector((x) => x.style.mainLayout);
  const sm = layout === "mobile" || layout === "tablet";
  const mode = useAppSelector((x) => x.crash.mode);
  
  const px = mode === 'auto' ? 0 : (sm ? 20: 24);
  const mt = mode === 'manual' ? 24 : 0;
  return (
    <Div
      fx
      column
      mt={mt}
      bg={"brown-6"}     
    >
      <Div fx gap={4} justifyContent="space-between" borderBottom borderColor="brown-4" px={px} py={16}>
        <Div gap={8} alignItems="center">
          <Vector as={SvgActiveUsers}  />
          <Heading as="h3"  fontWeight="regular">{tickets.length}</Heading>
        </Div>
        <Tokens value={tickets.reduce((x, ticket) => x + ticket.betAmount, 0)} />
      </Div>
      <Div column  py={16} px={mode === 'auto' ? 0 : (sm ? 20: 24)} gap={16} style={
          sm
            ? undefined
            : {
                minHeight: "240px",
                maxHeight: "240px",
                overflowY: "auto",
              }
        }>
        {ItemsMemo}     
      </Div>
      {ItemsMemo.length > 5 && <HistoryOverlay />}
    </Div>
  );
};
