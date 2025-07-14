import { SitePage } from "#app/comps/site-page/SitePage";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { HubEight } from "#app/services/hubEight";
import { Div } from "@client/comps/div/Div";
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
import { Button } from "@client/comps/button/Button";
import { SvgFullScreen } from "#app/svgs/common/SvgFullScreen";
import { SvgFullTheatherMode } from "#app/svgs/common/SvgFullTheatherMode";
import { useEffect, useRef } from "react";
import { NetworkStatus } from "#app/comps/network-status/NetworkStatus";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { setTheatreMode } from "@client/services/style/Style";
import { Style } from "@client/services/style";
import { NotFoundPage } from "../not-found/NotFoundPage";
import { DemoToggle } from "#app/comps/demo/DemoToggle";
import "./Game.scss";

export const Game = () => {
  const { t } = useTranslation();
  const small = useIsMobileLayout();
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const mainLayout = useAppSelector((state) => state.style.mainLayout);
  const gameCode = useParams().gameId!;
  const platform = small ? "GPL_MOBILE" : "GPL_DESKTOP";
  const theatreMode = useAppSelector((state) => state.style.theatreMode);

  const query = useQuery({
    queryKey: ["game-details", gameCode],
    queryFn: () => HubEight.getGameDetails({ game_code: gameCode }),
    placeholderData: (prev) => prev,
  });

  const game = query.data?.game as HubEightGameDocument;
  if (query.isLoading) return null;

  if (!game) return <NotFoundPage />;

  return (
    <SitePage
      className="GamesPage"
      gap={small ? 32 : 56}
      pb={small ? 32 : 56}
    >
      <GameLaunch
        gameCode={gameCode}
        platform={platform}
        demoAvailable={game.demo_game_support}
      />
      <Div
        fx
        column
        gap={small ? 32 : 56}
        px={!theatreMode ? 0 : Style.responsive(mainLayout, [20, 24, 40, 0])}
      >
        <GameDetails game={game} />
        <RecommendedGames />
        <ProvidersSection />
        {authenticated && (
          <BetBoard
            mt={small ? 12 : 0}
            mb={small ? 20 : 32}
            title={t("bets.recentBets")}
          />
        )}
      </Div>
    </SitePage>
  );
};

const GameDetails = ({ game }: { game: HubEightGameDocument }) => {
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
  gameCode,
  demoAvailable,
  platform,
}: {
  gameCode: string;
  demoAvailable?: boolean;
  platform: "GPL_DESKTOP" | "GPL_MOBILE";
}) => {
  const theatreMode = useAppSelector((state) => state.style.theatreMode);
  const demo = useAppSelector((state) => state.user.demoMode) ?? false;
  const small = useIsMobileLayout();
  const dispatch = useDispatch();
  const { t } = useTranslation(["games"]);
  const query = useQuery({
    queryKey: ["game", gameCode, demo],
    queryFn: () => HubEight.getGameLauncher({ platform, game_code: gameCode, demo }),
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    const gameUrl = query.data || [];
    console.log("Attempting to get Game Url ", gameUrl);
    return () => {
      dispatch(setTheatreMode(false));
    };
  }, []);

  const handleTheatreMode = () => {
    dispatch(setTheatreMode(!theatreMode));
  };

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  const gameLauncher = `https://casino.nolimitcdn.com/loader/game-loader.html?game=TheBorder&operator=DAMA500K&language=en&lobbyUrl=https%3A%2F%2Fshock.com&device=${platform}`; //query.data || [];
  //const gameUrl = query.data?.url || '' ;

  return (
    <Div
      fx
      fy
      column
      border
      borderColor="brown-4"
    >
      <Div
        className={classNames("GameWrapper", { theatreMode: theatreMode })}
        column
        fx
        justifyContent="center"
      >
        <iframe
          ref={iframeRef}
          src={gameLauncher}
          allowFullScreen
          height="100%"
          width="100%"
          title="Game Launcher"
          allow="fullscreen; camera; microphone; autoplay"
        />
      </Div>
      <Div
        fx
        bg="black-hover"
        column={small}
        gap={small ? 16 : 0}
        borderTop
        borderColor="brown-4"
        px={32}
        py={24}
        justifyContent="space-between"
        alignItems="center"
      >
        <Div
          gap={24}
          alignItems="center"
          flexGrow={1}
          fx
        >
          <NetworkStatus original={false} />
          <Button
            data-tooltip-id="app-tooltip"
            data-tooltip-content={theatreMode ? t("gameModes.standard") : t("gameModes.theatre")}
            onClick={handleTheatreMode}
            className="GameLaunchButton"
            size="sm"
            kind="menu-item"
            icon={SvgFullTheatherMode}
          />
          <Button
            data-tooltip-id="app-tooltip"
            data-tooltip-content={t("gameModes.fullscreen")}
            onClick={handleFullscreen}
            className="GameLaunchButton"
            size="icon"
            kind="menu-item"
            icon={SvgFullScreen}
          />
        </Div>
        {demoAvailable && (
          <Div
            justifyContent={small ? "flex-start" : "flex-end"}
            fx
          >
            <DemoToggle />
          </Div>
        )}
      </Div>
    </Div>
  );
};
