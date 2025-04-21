import { Div } from "@client/comps/div/Div";
import { UserCard } from "./UserCard";
import { SettingsHeader } from "./SettingsHeader";
import { LinkCard } from "./LinkCard";
import { ToggleCard } from "./ToggleCard";

export const SettingsBody = () => {

 return (
    <Div
      fx
      column
      gap={24}
    >
      <SettingsHeader/>
      <Div fx gap={24}>
        <Div column  gap={24} flexGrow={1} flexShrink={1} flexBasis={0}>
          <UserCard />
          <LinkCard />
        </Div> 
        <Div column  gap={24} flexGrow={1} flexShrink={1} flexBasis={0}>
          <ToggleCard />
        </Div>
      </Div>
    </Div>
  );
};
