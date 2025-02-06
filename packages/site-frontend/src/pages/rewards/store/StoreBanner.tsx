import { Intimal } from "@core/services/intimal";
import { SvgSiteGem } from "@client/svgs/site/SvgSiteGem";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { PageBanner } from "#app/comps/site-page/PageBanner";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";

export const StoreBanner = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const gemBalance = useAppSelector((x) => x.user.gemBalance);

  return (
    <PageBanner
      image="/graphics/rewards-store-banner"
      heading="Gem Store"
      description="Unlock amazing perks and massive prizes by spending your gems!"
      content={
        authenticated ? (
          <Div>
            <Div
              px={12}
              py={10}
              gap={6}
              center
              bg="brown-8"
              border
              borderColor="blue"
            >
              <Vector
                as={SvgSiteGem}
                size={14}
              />
              <Span
                family="title"
                weight="bold"
                color="white"
              >
                {Intimal.toLocaleString(gemBalance, 0)}
              </Span>
            </Div>
          </Div>
        ) : (
          <Div>
            <Button
              kind="primary"
              label="Login to View Rewards"
              onClick={() =>
                Dialogs.open("primary", <LoginModal initialAction="login" />)
              }
            />
          </Div>
        )
      }
    />
  );
};
