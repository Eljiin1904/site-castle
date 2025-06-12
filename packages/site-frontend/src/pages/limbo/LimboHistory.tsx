import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LimboHistoryCard } from "./LimboHistoryCard";

export const LimboHistory = () => {
  const history = useAppSelector((x) => x.limbo.history);
  const layout = useAppSelector((x) => x.style.mainLayout);

  const getHistoryLength = () => {
    switch (layout) {
      case "desktop":
        return 12;
      case "laptop":
        return 10;
      case "tablet":
        return 10;
      case "mobile":
        return 5;
      default:
        return 5;
    }
  };

  const reversed = [...history].reverse().slice(0, getHistoryLength());

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
      {reversed.map((roll, i) => (
        <LimboHistoryCard
          key={i}
          roll={roll}
        />
      ))}
    </Div>
  );
};
