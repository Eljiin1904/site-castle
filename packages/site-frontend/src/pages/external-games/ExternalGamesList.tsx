import { getGameLauncher } from "../../services/hubEight/api/getHubGameLauncher";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { VerificationModal } from "#app/modals/verification/VerificationModal";
import { Div } from "@client/comps/div/Div";

export const ExternalGamesList = ({
  games,
}: {
  url_thumbnail: string;
  url_background: string;
  game_code: string;
  name: string;
  release_date: string;
}[]) => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const betAmount = useAppSelector((x) => x.dice.betAmount);
  const targetValue = useAppSelector((x) => x.dice.targetValue);
  const targetKind = useAppSelector((x) => x.dice.targetKind);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);

  const handleLaunch = async (game_code: string) => {
    if (!authenticated) {
      return Dialogs.open("primary", <LoginModal />);
    }
    if (!emailConfirmed) {
      return Dialogs.open("primary", <UserEmailConfirmModal />);
    }
    if (kycTier < 1) {
      return Dialogs.open("primary", <VerificationModal />);
    }

    const res = await getGameLauncher({
      platform: "GPL_DEKSTOP",
      game_code,
    });

    if (res.data) {
      window.open(res.data.url, "_blank");
    }
  };
  <Div>
    {games.map((game) => {
      <Div onClick={() => handleLaunch(game.game_code)}>{game.name}</Div>;
    })}
  </Div>;
};
