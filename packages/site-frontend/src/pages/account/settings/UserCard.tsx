import { Fragment, useState } from "react";
import { Dates } from "@core/services/dates";
import { Dialogs } from "@client/services/dialogs";
import { usePost } from "@client/hooks/system/usePost";
import { Link } from "@client/comps/link/Link";
import { Card } from "@client/comps/cards/Card";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { AuthenticatorDisableModal } from "#app/modals/security/AuthenticatorDisableModal";
import { AuthenticatorEnableModal } from "#app/modals/security/AuthenticatorEnableModal";
import { UserPasswordEditModal } from "#app/modals/user/UserPasswordEditModal";
import { UserPasswordSetModal } from "#app/modals/user/UserPasswordSetModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { UserEmailEditModal } from "#app/modals/user/UserEmailEditModal";
import { Users } from "#app/services/users";
import { UserExclusionStartModal } from "#app/modals/user/UserExclusionStartModal";
import { UserSlide } from "./UserSlide";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserCard = () => {
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const tfaEnabled = useAppSelector((x) => x.user.tfa.enabled);
  const passwordSet = useAppSelector((x) => x.user.passwordSet);
  const suspension = useAppSelector((x) => x.user.suspension);
  const [sent, setSent] = useState(false);
  const { t } = useTranslation(["account"]);
  const isSuspended = Users.isSuspended(suspension);

  const handleSendLink = usePost(async () => {
    setSent(true);
    await Users.sendEmailLink();
  });

  return (
    <Card column>
      <UserSlide
        id={"email"}
        heading={t("settings.email.title")}
        description={t("settings.email.description")}
        buttonLabel={t("common:edit")}
        onButtonClick={() => Dialogs.open("primary", <UserEmailEditModal />)}
        extraContent={<Fragment>
          {!emailConfirmed && !sent && (
            <NoticeCard
              kind="warning"
              message={
                <Fragment>
                  {t("settings.email.emailNotConfirmed")}
                  <Link
                    type="action"
                    fontWeight="semi-bold"
                    onClick={handleSendLink}
                    ml={4}
                  >
                    {t("common:confirmNow")}
                  </Link>
                </Fragment>
              }
            />
          )}
          {!emailConfirmed && sent && (
            <NoticeCard
              kind="success"
              message={t("settings.email.linkSent")}
            />
          )}
        </Fragment>}
      />
      <UserSlide
        id={"passsword"}
        heading={t("settings.password.title")}
        description={t("settings.password.description")}
        buttonLabel={t(`common:${passwordSet ? "edit" : "set"}`)}
        onButtonClick={() =>
          Dialogs.open(
            "primary",
            passwordSet ? <UserPasswordEditModal /> : <UserPasswordSetModal />,
          )
        }
      />
      <UserSlide
        id={"authenticator"}
        heading={t("settings.authenticator.title")}
        description={t("settings.authenticator.description")}
        successMessage={tfaEnabled ? t("common:enabled") : undefined}
        buttonKind={tfaEnabled ? "tertiary-grey" : "primary-yellow"}
        buttonLabel={t(`common:${tfaEnabled ? "disable" : "enable"}`)}
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
        id={"selfExclusion"}
        heading={t("settings.selfExclusion.title")}
        description={
          isSuspended
            ? t("settings.selfExclusion.ends",{value:Dates.toTimestamp(suspension.endDate!)})
            : t("settings.selfExclusion.description")
        }
        buttonLabel={t(`common:${isSuspended ? "enabled" : "enable"}`)}
        buttonDisabled={isSuspended}
        onButtonClick={() =>
          Dialogs.open("primary", <UserExclusionStartModal />)
        }
        borderBottom={false}
      />
    </Card>
  );
};
