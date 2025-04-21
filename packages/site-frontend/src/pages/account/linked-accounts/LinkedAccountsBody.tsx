import { Div } from "@client/comps/div/Div";
import { LinkedAccountsHeader } from "./LinkedAccountsHeader";
import { LinkCard } from "./LinkCard";

export const LinkedAccountsBody = () => {

  return (
    <Div
      fx
      column
      gap={24}
    >
      <LinkedAccountsHeader/>
      <LinkCard />
    </Div>
  );
};
