import { SitePage } from "#app/comps/site-page/SitePage";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { HubEight } from "#app/services/hubEight";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Span } from "@client/comps/span/Span";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { RecommendedGames } from "./RecommendedGames";
import { ProvidersSection } from "../home/HomePage";
import { BetBoard } from "#app/comps/bet-board/BetBoard";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { HubEightGameDocument } from "@core/types/hub-eight/HubEightGameDocument";

export const Game = () => {
  const { t } = useTranslation();
  const small = useIsMobileLayout();
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const gameId = useParams().gameId;
  const platform = small ? "GPL_MOBILE" : "GPL_DESKTOP";

  return (
    <SitePage
      className="GamesPage"
      gap={small ? 32 : 56}
      pb={small ? 32 : 56}
    >
      <Div
        fx
        column
        gap={40}
      >
        <GameLaunch
          game_code={gameId!}
          platform={platform}
        />
        <GameDetails game_code={gameId!} />
      </Div>
      <RecommendedGames />
      <ProvidersSection />
      {authenticated && (
        <BetBoard
          mt={small ? 12 : 0}
          mb={small ? 20 : 32}
          title={t("bets.recentBets")}
        />
      )}
    </SitePage>
  );
};

const GameDetails = ({ game_code }: { game_code: string }) => {
  const query = useQuery({
    queryKey: ["game-details", game_code],
    queryFn: () => HubEight.getGameDetails({ game_code }),
    placeholderData: (prev) => prev,
  });
  const game = query.data?.game as HubEightGameDocument;
  console.log("Game details query", query.data);
  if (!game) return null;

  return (
    <Div
      column
      fx
      alignItems="flex-start"
      gap={16}
    >
      <PageTitle heading={game.name} />
      <Span>{game.category}</Span>
    </Div>
  );
};
const GameLaunch = ({
  game_code,
  platform,
}: {
  game_code: string;
  platform: "GPL_DESKTOP" | "GPL_MOBILE";
}) => {
  const query = useQuery({
    queryKey: ["game", game_code],
    queryFn: () => HubEight.getGameLauncher({ platform, game_code }),
    placeholderData: (prev) => prev,
  });

  const gameLauncher =
    "https://casino.nolimitcdn.com/loader/game-loader.html?game=TheBorder&operator=DAMA500K&language=en&lobbyUrl=https%3A%2F%2Fshock.com&device=desktop"; //query.data || [];
  return (
    <Div fx>
      <iframe
        src={gameLauncher}
        style={{ width: "100%", height: "100vh", border: "none" }}
        title="Game Launcher"
      />
    </Div>
  );
};
