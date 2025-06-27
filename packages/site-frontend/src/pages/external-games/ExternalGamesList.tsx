import { getGameLauncher } from "../../services/hubEight/api/getHubGameLauncher";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { VerificationModal } from "#app/modals/verification/VerificationModal";
import { useLibrarySelector } from "#client/hooks/store/useLibrarySelector";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import "./ExternalGameList.scss";

type ExternalGame = {
  url_thumbnail: string;
  url_background: string;
  game_code: string;
  name: string;
  release_date: string;
};

export const ExternalGamesList = ({ games }: { games: ExternalGame[] }) => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const betAmount = useAppSelector((x) => x.dice.betAmount);
  const targetValue = useAppSelector((x) => x.dice.targetValue);
  const targetKind = useAppSelector((x) => x.dice.targetKind);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const layout = useLibrarySelector((x) => x.style.bodyLayout);
  const small = layout === "mobile";

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
      platform: small ? "GPL_MOBILE" : "GPL_DESKTOP",
      game_code,
    });

    if (res.data.url) {
      window.open(res.data.url, "_blank");
    }
  };
  return (
    <Div>
      <div className="game-grid">
        {/* {games.map((game) => (
          <div
            className="game-card"
            key={game.game_code}
            onClick={() => handleLaunch(game.game_code)}
          >
            <img
              src={game.url_thumbnail}
              alt={game.name}
            />
            <div className="info">
              <h3>{game.name}</h3>
              <p>{game.release_date}</p>
            </div>
          </div>
          // </div>
        ))} */}
      </div>
    </Div>
  );
};
