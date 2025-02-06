import { Div } from "@client/comps/div/Div";
import { ProgressBar } from "@client/comps/progress-bar/ProgressBar";
import { Span } from "@client/comps/span/Span";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { PageBanner } from "#app/comps/site-page/PageBanner";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useUserLevel } from "#app/hooks/users/useUserLevel";
import { LoginModal } from "#app/modals/login/LoginModal";

export const CasesBanner = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const { level, levelProgress, levelGoal } = useUserLevel();

  return (
    <PageBanner
      image="/graphics/rewards-cases-banner"
      heading="Level Up Cases"
      description="Level up and get 3 reward keys to unlock epic cases!"
      content={
        authenticated ? (
          <Div
            column
            style={{ maxWidth: "300px" }}
          >
            <Span
              size={13}
              color="light-purple"
            >
              {`Progress to Level ${level + 1}`}
            </Span>
            <ProgressBar
              height={8}
              progress={levelProgress / levelGoal}
              mt={12}
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
