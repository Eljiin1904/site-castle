import { useAppSelector } from "#app/hooks/store/useAppSelector";

export function useProcessingTicket() {
  const userId = useAppSelector((x) => x.user._id);
  const round = useAppSelector((x) => x.crash.round);
  const roundTicket = useAppSelector((x) => x.crash.tickets.find((x) => x.user.id === userId));

  const isProcessing = () => {
   
    if(!roundTicket) return false;
    if(roundTicket.cashoutTriggered) return false;
    if(round.status !== "completed") return true;
    return false;
  };

  return isProcessing();
};