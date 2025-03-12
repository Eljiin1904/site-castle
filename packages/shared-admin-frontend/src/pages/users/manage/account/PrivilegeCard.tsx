import { UserDocument } from "@core/types/users/UserDocument";
import { Intimal } from "@core/services/intimal";
import { Strings } from "@core/services/strings";
import { Card } from "@client/comps/cards/Card";
import { CardSection } from "@client/comps/cards/CardSection";
import { Heading } from "@client/comps/heading/Heading";
import { Dialogs } from "@client/services/dialogs";
import { Users } from "#app/services/users";
import { UserMuteModal } from "#app/modals/user/UserMuteModal.";
import { UserSuspensionModal } from "#app/modals/user/UserSuspensionModal";
import { UserBanModal } from "#app/modals/user/UserBanModal";
import { UserTipLimitModal } from "#app/modals/user/UserTipLimitModal";
import { AccountSection } from "./AccountSection";

export const PrivilegeCard = ({ user }: { user: UserDocument }) => {
  return (
    <Card column>
      <CardSection position="header">
        <Heading>{"Privileges"}</Heading>
      </CardSection>
      <CardSection
        column
        gap={16}
      >
        <AccountSection
          heading="Tip Limit"
          value={
            user.meta.tipLimit
              ? `${Intimal.toLocaleString(user.meta.tipLimit)} per day`
              : "No limit"
          }
          onEditClick={() =>
            Dialogs.open("primary", <UserTipLimitModal user={user} />)
          }
        />
        <AccountSection
          heading="Mute"
          value={
            Users.isMuted(user.mute)
              ? Strings.kebabToTitle(user.mute.reason!)
              : "Disabled"
          }
          onEditClick={() =>
            Dialogs.open("primary", <UserMuteModal user={user} />)
          }
        />
        <AccountSection
          heading="Suspension"
          value={
            Users.isSuspended(user.suspension)
              ? Strings.kebabToTitle(user.suspension.reason!)
              : "Disabled"
          }
          onEditClick={() =>
            Dialogs.open("primary", <UserSuspensionModal user={user} />)
          }
        />
        <AccountSection
          heading="Ban"
          value={
            Users.isBanned(user.ban)
              ? Strings.kebabToTitle(user.ban.reason!)
              : "Disabled"
          }
          onEditClick={() =>
            Dialogs.open("primary", <UserBanModal user={user} />)
          }
        />
      </CardSection>
    </Card>
  );
};
