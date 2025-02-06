import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { HolidayCaseCard } from "./HolidayCaseCard";

export const HolidayCaseGrid = () => {
  const chests = useAppSelector((x) => x.holiday.event.chests);

  return (
    <Div
      fx
      flexFlow="row-wrap"
      gap={12}
    >
      {chests.map((x) => (
        <HolidayCaseCard
          key={x.id}
          chest={x}
        />
      ))}
    </Div>
  );
};
