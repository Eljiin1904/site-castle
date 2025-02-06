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

export const LinkSlide = ({
  icon,
  provider,
  linked,
}: {
  icon: Svg;
  provider: UserLinkProvider;
  linked: boolean;
}) => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const small = mainLayout === "mobile";
  const title = Strings.kebabToTitle(provider);

  return (
    <CardSection
      py={16}
      gap={small ? 12 : 16}
    >
      <Vector
        as={icon}
        size={24}
      />
      <Div
        align="center"
        grow
      >
        <Span
          family="title"
          weight="bold"
          color="white"
          size={small ? 14 : 16}
        >
          {title}
        </Span>
      </Div>
      {linked && (
        <Div align="center">
          <Vector
            as={SvgCheckCircle}
            size={16}
            color="green"
          />
          {!small && (
            <Span
              weight="semi-bold"
              color="green"
              ml={6}
              mr={8}
            >
              {"Connected"}
            </Span>
          )}
        </Div>
      )}
      <Div align="center">
        <Button
          kind={linked ? "secondary" : "primary"}
          label={linked ? "Unlink" : "Link"}
          labelSize={small ? 12 : 14}
          style={{
            minWidth: small ? "64px" : "80px",
            maxWidth: small ? "64px" : "80px",
            height: small ? "36px" : "40px",
          }}
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
