import { Fragment, useState } from "react";
import { Dates } from "@core/services/dates";
import { Heading } from "@client/comps/heading/Heading";
import { Dialogs } from "@client/services/dialogs";
import { usePost } from "@client/hooks/system/usePost";
import { SvgAt } from "@client/svgs/common/SvgAt";
import { Link } from "@client/comps/link/Link";
import { Card } from "@client/comps/cards/Card";
import { CardSection } from "@client/comps/cards/CardSection";
import { SvgAsterisk } from "@client/svgs/common/SvgAsterisk";
import { SvgLock } from "@client/svgs/common/SvgLock";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { SvgHourglass } from "@client/svgs/common/SvgHourglass";
import { AuthenticatorDisableModal } from "#app/modals/security/AuthenticatorDisableModal";
import { AuthenticatorEnableModal } from "#app/modals/security/AuthenticatorEnableModal";
import { UserPasswordEditModal } from "#app/modals/user/UserPasswordEditModal";
import { UserPasswordSetModal } from "#app/modals/user/UserPasswordSetModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { UserEmailEditModal } from "#app/modals/user/UserEmailEditModal";
import { Users } from "#app/services/users";
import { UserExclusionStartModal } from "#app/modals/user/UserExclusionStartModal";
import { UserSlide } from "./UserSlide";

export const UserCard = () => {
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const tfaEnabled = useAppSelector((x) => x.user.tfa.enabled);
  const passwordSet = useAppSelector((x) => x.user.passwordSet);
  const suspension = useAppSelector((x) => x.user.suspension);
  const [sent, setSent] = useState(false);

  const isSuspended = Users.isSuspended(suspension);

  const handleSendLink = usePost(async () => {
    setSent(true);
    await Users.sendEmailLink();
  });

  return (
    <Card column>
      <CardSection
        position="header"
        py={16}
      >
        <Heading>{"User"}</Heading>
      </CardSection>
      <UserSlide
        icon={SvgAt}
        heading="Email"
        description="Change your email"
        buttonLabel="Edit"
        onButtonClick={() => Dialogs.open("primary", <UserEmailEditModal />)}
      />
      {!emailConfirmed && !sent && (
        <NoticeCard
          kind="warning"
          message={
            <Fragment>
              {"Your email is not confirmed."}
              <Link
                type="action"
                fontWeight="semi-bold"
                onClick={handleSendLink}
                ml={4}
              >
                {"Confirm Now"}
              </Link>
            </Fragment>
          }
        />
      )}
      {!emailConfirmed && sent && (
        <NoticeCard
          kind="success"
          message="Link sent! Please check your email."
        />
      )}
      <UserSlide
        icon={SvgLock}
        heading="Password"
        description="Change your password"
        buttonLabel={passwordSet ? "Edit" : "Set"}
        onButtonClick={() =>
          Dialogs.open(
            "primary",
            passwordSet ? <UserPasswordEditModal /> : <UserPasswordSetModal />,
          )
        }
      />
      <UserSlide
        icon={SvgAsterisk}
        heading="Authenticator"
        description="Enable to use 2FA"
        successMessage={tfaEnabled ? "Enabled" : undefined}
        buttonKind={tfaEnabled ? "secondary" : "primary"}
        buttonLabel={tfaEnabled ? "Disable" : "Enable"}
        onButtonClick={() =>
          Dialogs.open(
            "primary",
            tfaEnabled ? (
              <AuthenticatorDisableModal />
            ) : (
              <AuthenticatorEnableModal />
            ),
          )
        }
      />
      <UserSlide
        icon={SvgHourglass}
        heading="Self-Exclusion"
        description={
          isSuspended
            ? `Ends ${Dates.toTimestamp(suspension.endDate)}`
            : "Need a break?"
        }
        buttonLabel={isSuspended ? "Enabled" : "Enable"}
        buttonDisabled={isSuspended}
        onButtonClick={() =>
          Dialogs.open("primary", <UserExclusionStartModal />)
        }
      />
    </Card>
  );
};
