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
      position="absolute"
      bottom={100}
      zIndex={2}
      justify="center"
      p={16}
      gap={14}
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
