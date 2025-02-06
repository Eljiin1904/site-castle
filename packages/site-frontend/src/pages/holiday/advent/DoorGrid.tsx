import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Rewards } from "#app/services/rewards";
import { DoorCard } from "./DoorCard";
import { useOpen } from "./useOpen";

export const DoorGrid = () => {
  const tickets = useAppSelector((x) => x.holiday.adventTickets);
  const resetDate = useAppSelector((x) => x.holiday.event.adventResetDate);
  const currentDay = Rewards.getAdventDay({ resetDate });

  const handleOpen = useOpen();

  return (
    <Div
      fx
      flexFlow="row-wrap"
      gap={8}
    >
      {[...Array(31)].map((x, i) => (
        <DoorCard
          key={i}
          day={i + 1}
          currentDay={currentDay}
          ticket={tickets.find((x) => x.day === i + 1)}
          onClick={() => handleOpen(i + 1)}
        />
      ))}
    </Div>
  );
};
