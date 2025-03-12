import { differenceInYears } from "date-fns";
import { UserDocument } from "@core/types/users/UserDocument";
import { Strings } from "@core/services/strings";
import { Dates } from "@core/services/dates";
import { CardSection } from "@client/comps/cards/CardSection";
import { Heading } from "@client/comps/heading/Heading";
import { Card } from "@client/comps/cards/Card";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { Utility } from "@client/services/utility";
import { Users } from "#app/services/users";
import { UserEmailModal } from "#app/modals/user/UserEmailModal";
import { UserNameModal } from "#app/modals/user/UserNameModal";
import { UserRoleModal } from "#app/modals/user/UserRoleModal";
import { UserTagsModal } from "#app/modals/user/UserTagsModal";
import { UserReferralModal } from "#app/modals/user/UserReferralModal";
import { AccountSection } from "./AccountSection";
import { UserClear2faModal } from "#app/modals/user/UserClear2faModal";
import { SvgMinusCircle } from "@client/svgs/common/SvgMinusCircle";

export const GeneralCard = ({ user }: { user: UserDocument }) => {
  return (
    <Card column>
      <CardSection position="header">
        <Heading>{"General"}</Heading>
      </CardSection>
      <CardSection
        column
        gap={16}
      >
        <Div gap={16}>
          <AccountSection
            heading="User ID"
            value={user._id}
          />
          <AccountSection
            heading="Username"
            value={user.username}
            onEditClick={() =>
              Dialogs.open("primary", <UserNameModal user={user} />)
            }
          />
        </Div>
        <AccountSection
          heading="Email"
          value={user.email}
          onEditClick={() =>
            Dialogs.open("primary", <UserEmailModal user={user} />)
          }
        />
        <Div gap={16}>
          <AccountSection
            heading="Role"
            value={Strings.kebabToTitle(user.role)}
            onEditClick={() =>
              Dialogs.open("primary", <UserRoleModal user={user} />)
            }
          />
          <AccountSection
            heading="Level"
            value={Users.getLevel(user.xp)}
          />
        </Div>
        <AccountSection
          heading="Tags"
          value={
            user.tags.map((x) => Strings.kebabToTitle(x)).join(", ") || "None"
          }
          onEditClick={() =>
            Dialogs.open("primary", <UserTagsModal user={user} />)
          }
        />
        <AccountSection
          heading="Refered By"
          value={Users.getRefererString(user.referer)}
        />
        <AccountSection
          heading="Referral (Current Affiliate)"
          value={user.referral?.name || "None"}
          onEditClick={() =>
            Dialogs.open("primary", <UserReferralModal user={user} />)
          }
        />
        <Div gap={16}>
          <AccountSection
            heading="KYC Tier"
            value={user.kyc.tier}
          />
          <AccountSection
            heading="First Name"
            value={user.kyc.firstName || "N/A"}
          />
          <AccountSection
            heading="Last Name"
            value={user.kyc.lastName || "N/A"}
          />
          <AccountSection
            heading="Age"
            value={
              user.kyc.dob
                ? differenceInYears(
                    Date.now(),
                    Utility.getBirthDate(user.kyc.dob),
                  )
                : "N/A"
            }
          />
        </Div>
        <AccountSection
          heading="Last Location"
          value={
            user.meta.lastLocation
              ? Users.getLocationString(user.meta.lastLocation)
              : "N/A"
          }
        />
        <Div gap={16}>
          <AccountSection
            heading="Registered"
            value={Dates.toFullDateString(user.registerDate)}
          />
          <AccountSection
            heading="Active"
            value={Dates.toElapsedString(user.meta.activeDate, false)}
          />
          <AccountSection
            heading="Deposited"
            value={Dates.toElapsedString(user.meta.lastDepositDate, false)}
          />
        </Div>
        <AccountSection
          heading="Authenticator"
          value={Users.hasAuthenticator(user.tfa) ? "Enabled" : "Disabled"}
          onEditClick={
            Users.hasAuthenticator(user.tfa)
              ? () =>
                  Dialogs.open("secondary", <UserClear2faModal user={user} />)
              : undefined
          }
          icon={SvgMinusCircle}
          btnTitle="Disable"
        />
      </CardSection>
    </Card>
  );
};
