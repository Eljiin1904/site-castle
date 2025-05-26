import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { CrashHistoryCard } from "./CrashHistoryCard";

export const CrashHistory = () => {
  const history = useAppSelector((x) => x.crash.history);
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
      {reversed.map((round, i) => (
        <CrashHistoryCard
          key={i}
          round={round}
        />
      ))}
    </Div>
  );
};