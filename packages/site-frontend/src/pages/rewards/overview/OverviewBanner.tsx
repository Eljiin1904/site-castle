import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Dialogs } from "@client/services/dialogs";
import { PageBanner } from "#app/comps/site-page/PageBanner";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { RewardStatsModal } from "#app/modals/rewards/RewardStatsModal";
import { LoginModal } from "#app/modals/login/LoginModal";

export const OverviewBanner = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const totalRewards = useAppSelector((x) => x.user.stats.rewardAmount);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <PageBanner
      image="/graphics/rewards-banner"
      heading="Amazing Rewards and Bonuses!"
      description="Castle.com has the best rewards. Don't believe us? See for yourself!"
      content={
        authenticated ? (
          <Div
            align="center"
            gap={small ? 8 : 12}
          >
            <Div
              fx={small}
              px={12}
              py={small ? 11 : 9}
              gap={4}
              align="center"
              bg="brown-8"
              border
              borderColor="yellow"
            >
              <Span
                size={small ? 12 : 14}
                color="white"
              >
                {small ? "Total:" : "Total Rewards:"}
              </Span>
              <Tokens
                value={totalRewards || 0}
                fontSize={small ? 14 : 16}
              />
            </Div>
            <Button
              kind="primary"
              label="Summary"
              width={small ? undefined : 128}
              onClick={() => Dialogs.open("primary", <RewardStatsModal />)}
            />
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
