import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { UserCard } from "./UserCard";
import { TradeUrlCard } from "./TradeUrlCard";

export const SettingsBody = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile" || layout === "tablet";

  return (
    <Div
      gap={16}
      flow={small ? "row-wrap" : undefined}
    >
      <Div
        fx
        column
        gap={16}
      >
        <UserCard />
      </Div>
      <Div
        fx
        column
        gap={16}
      >
        <TradeUrlCard />
      </Div>
    </Div>
  );
};
