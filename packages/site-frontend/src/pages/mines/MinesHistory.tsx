import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { MinesHistoryCard } from "./MinesHistoryCard";

export const MinesHistory = () => {
  const history = useAppSelector((x) => x.mines.history);
  const reversed = [...history].reverse();

  return (
    <Div
      fx
      justify="flex-end"
      p={16}
      gap={16}
      position="absolute"
      bottom={0}
      zIndex={1}
    >
      {reversed.map((game, i) => (
        <MinesHistoryCard
          key={i}
          game={game}
        />
      ))}
    </Div>
  );
};