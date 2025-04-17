import { Div } from "@client/comps/div/Div";
import { PreferencesHeader } from "./PreferencesHeader";
import { ToggleCard } from "./ToggleCard";

export const PreferencesBody = () => {

  return (
    <Div
      fx
      column
      gap={24}
    >
      <PreferencesHeader/>
      <ToggleCard />
    </Div>
  );
};
