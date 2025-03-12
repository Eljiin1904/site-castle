import { Div } from "@client/comps/div/Div";
import { UserDocument } from "@core/types/users/UserDocument";
import { GeneralCard } from "./GeneralCard";
import { LedgerCard } from "./LedgerCard";
import { PrivilegeCard } from "./PrivilegeCard";

export const AccountBody = ({ user }: { user: UserDocument }) => {
  return (
    <Div
      fx
      gap={16}
    >
      <GeneralCard user={user} />
      <Div
        fx
        column
        gap={16}
      >
        <LedgerCard user={user} />
        <PrivilegeCard user={user} />
      </Div>
    </Div>
  );
};
