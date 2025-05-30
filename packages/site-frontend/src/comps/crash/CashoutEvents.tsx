import { useAppSelector, } from "#app/hooks/store/useAppSelector";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Fragment } from "react/jsx-runtime";
import { Crash } from "#app/services/crash";
import { Crash as CoreCrash } from "@core/services/crash";

export const CashoutEvents = ({multiplier}: {multiplier: number}) => {

  const userId = useAppSelector((x) => x.user._id);
  const tickets = useAppSelector((x) => x.crash.tickets)?.filter((x) => 
    x.user.id !== userId &&
    x.cashoutTriggered &&
    x.multiplierCrashed &&
    x.multiplierCrashed <= multiplier
  );
  
  return (
    <Fragment>
      {tickets.map((ticket) => <CashoutTicket ticket={ticket} key={ticket._id} multiplier={multiplier} />)}
    </Fragment>
  );
}

const CashoutTicket = ({ ticket, multiplier }: { ticket: CrashTicketDocument , multiplier: number}) => {

  const { username, hideInfo } = useHiddenInfo(ticket.user);
  const ticketMultiplier  = ticket.multiplierCrashed ?? 1;
  const multiplierPosition = Crash.getMultiplierPosition(multiplier);
  const cashoutPosition = Crash.getCashoutPosition(multiplier, ticketMultiplier);
  const amount = CoreCrash.getProfit({betAmount: ticket.betAmount, multiplier: ticketMultiplier})

  const proportion = Math.max(0.5, Math.min(1, cashoutPosition/multiplierPosition));
  return (<Div center gap={4} right={56} fontSize={10}  px={8} py={4} bg="black-hover" style={{ opacity: proportion, transformOrigin: 'right', transform: `scale(${Math.max(0.5, proportion)})`, bottom: `${Crash.chart.offset +cashoutPosition - 18}px`}}  position="absolute" color={hideInfo ? "gray" : "light-sand"}>
    {username}
    <Tokens fontSize={10}  color={"light-sand"} value={amount}
  />
  </Div>);
}