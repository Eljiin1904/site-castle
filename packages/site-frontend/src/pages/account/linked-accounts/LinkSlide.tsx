import { UserLinkProvider } from "@core/types/users/UserLinkProvider";
import { Strings } from "@core/services/strings";
import { Dialogs } from "@client/services/dialogs";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { CardSection } from "@client/comps/cards/CardSection";
import { SocialAuthStartModal } from "#app/modals/security/SocialAuthStartModal";
import { UserUnlinkAccountModal } from "#app/modals/user/UserUnlinkAccountModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Heading } from "@client/comps/heading/Heading";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const LinkSlide = ({
  provider,
  description,
  linked,
  borderBottom = true,
}: {
  borderBottom?: boolean;
  provider: UserLinkProvider;
  description?: string;
  linked: boolean;
}) => {
  
  const { t } = useTranslation(["account"]);
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const small = mainLayout === "mobile";

  return (
    <CardSection  px={small ? 20 : 24} py={0} position="none">
      <Div fx py={16} borderBottom={borderBottom} borderColor="brown-4" justify="space-between" center>
        <Div column gap={8} className="toggle-slide">
        <Heading as="h3" fontWeight="regular" textTransform="uppercase">
          {t(`linkedAccounts.${provider}.title`)}
        </Heading>
        {linked ? (
            <Div align="center">
              <Vector
                as={SvgCheckCircle}
                size={16}
                color="bright-green"
              />
              {!small && (
                <Span
                  weight="semi-bold"
                  color="bright-green"
                  ml={8}
                >
                  {t("common:connected")}
                </Span>
              )}
            </Div>
          ): <Span
                className="description-text">
                {description}
              </Span>}
          </Div>
          <Button
            kind={linked ? "tertiary-grey" : "primary-yellow"}
            label={linked ? t("common:unlink") : t("common:link")}
            
            onClick={() =>
              Dialogs.open(
                "primary",
                linked ? (
                  <UserUnlinkAccountModal provider={provider} />
                ) : (
                  <SocialAuthStartModal provider={provider} />
                ),
              )
            }
          />
        </Div>
    </CardSection>
  );
};
