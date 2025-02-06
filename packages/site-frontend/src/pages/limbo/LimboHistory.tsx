import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LimboHistoryCard } from "./LimboHistoryCard";

export const LimboHistory = () => {
  const history = useAppSelector((x) => x.limbo.history);
  const reversed = [...history].reverse();

  return (
    <Div
      fx
      justify="flex-end"
      p={16}
      gap={4}
    >
      {reversed.map((roll, i) => (
        <LimboHistoryCard
          key={i}
          roll={roll}
        />
      ))}
    </Div>
  );
};
