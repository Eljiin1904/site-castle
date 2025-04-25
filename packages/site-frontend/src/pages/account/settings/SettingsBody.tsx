import { Div } from "@client/comps/div/Div";
import { UserCard } from "./UserCard";
import { SettingsHeader } from "./SettingsHeader";
import { LinkCard } from "./LinkCard";
import { ToggleCard } from "./ToggleCard";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const SettingsBody = () => {

  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile" || layout === "tablet";

 return (
    <Div
      fx
      column
      gap={24}
    >
      <SettingsHeader/>
      <Div fx gap={small ? 16: 24} column={small}>
        <Div column  gap={small ? 16: 24} flexGrow={1} flexShrink={1} flexBasis={0}>
          <UserCard />
          <LinkCard />
        </Div> 
        <Div column  gap={small ? 16: 24} flexGrow={1} flexShrink={1} flexBasis={0}>
          <ToggleCard />
        </Div>
      </Div>
    </Div>
  );
};
