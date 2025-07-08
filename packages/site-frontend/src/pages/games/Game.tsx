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
import { useEffect, useRef, useState } from "react";
import { NetworkStatus } from "#app/comps/network-status/NetworkStatus";
import { Toggle } from "@client/comps/toggle/Toggle";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { setTheatreMode } from "@client/services/style/Style";
import { Style } from "@client/services/style";
import { NotFoundPage } from "../not-found/NotFoundPage";
import './Game.scss';
import { Dialogs } from "@client/services/dialogs";
import { LoginModal } from "#app/modals/login/LoginModal";

export const Game = () => {
  const { t } = useTranslation();
  const small = useIsMobileLayout();
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const mainLayout = useAppSelector((state) => state.style.mainLayout);
  const gameCode = useParams().gameId!;
  const platform = small ? 'GPL_MOBILE': 'GPL_DESKTOP';
  const theatreMode = useAppSelector((state) => state.style.theatreMode);

  const query = useQuery({
    queryKey: ["game-details", gameCode],
    queryFn: () => HubEight.getGameDetails({ game_code:gameCode }),
    placeholderData: (prev) => prev
  });

  const game = query.data?.game as HubEightGameDocument;
  if(query.isLoading)
    return null;
  
  if (!game) 
    return (<NotFoundPage />);

  return (<SitePage
    className="GamesPage"
    gap={small ? 32 : 56}
    pb={small ? 32 : 56}
  >
    <GameLaunch game_code={ gameCode } platform={platform} demo_available={game.demo_game_support}/>
    <Div fx column gap={small ? 32: 56} px={!theatreMode ? 0: Style.responsive(mainLayout, [20, 24, 40, 0])}>
      <GameDetails game={ game } />
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
  </SitePage>)
};

const GameDetails = ({ game }: { game: HubEightGameDocument }) => {
  
  return (<Div column fx alignItems="flex-start" gap={16}>
    <PageTitle heading={game.name} />
    <Span>{game.category}</Span>
  </Div>);
};

const GameLaunch = ({
  game_code,
  demo_available,
  platform,
}: {
  game_code: string;
  demo_available?: boolean;
  platform: "GPL_DESKTOP" | "GPL_MOBILE";
}) => {

  const authenticated = useAppSelector((x) => x.user.authenticated);
  const theatreMode = useAppSelector((state) => state.style.theatreMode);
  const small = useIsMobileLayout();
  const dispatch = useDispatch();
  const [demoMode, setDemoMode] = useState(false);
  const {t} = useTranslation(['games']);
   
  const query = useQuery({
    queryKey: ["game", game_code],
    queryFn: () => HubEight.getGameLauncher({ platform, game_code }),
    placeholderData: (prev) => prev,
  });

  useEffect(() => {

    setDemoMode(!authenticated);

    return () => {
      dispatch(setTheatreMode(false));
    }
  },[authenticated]);

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

  /**
   * Handle change of demo mode. If game doesnt support demo mode, do nothing.
   * If demo mode is on, only change if authenticated, if not authenticated show login modal.
   * If demo mode is off, toggle it on.
   * @returns void
   */
  const handleChangeDemoMode = () => {

    if(!demo_available)
      return;
    if(demoMode && !authenticated)
      return Dialogs.open("primary", <LoginModal />);
    setDemoMode(!demoMode);
  }

  const gameLauncher = `https://casino.nolimitcdn.com/loader/game-loader.html?game=TheBorder&operator=DAMA500K&language=en&lobbyUrl=https%3A%2F%2Fshock.com&device=${platform}`;//query.data || [];
  //const gameLauncher = 'https://cdntr.a8r.rip/index.html?options=eyJ0YXJnZXRfZWxlbWVudCI6ImdhbWVfd3JhcHBlciIsImxhdW5jaF9vcHRpb25zIjp7ImdhbWVfbGF1bmNoZXJfdXJsIjoiaHR0cHM6Ly9jZG50ci5hOHIucmlwL2luZGV4Lmh0bWwiLCJzdHJhdGVneSI6ImlmcmFtZSIsImdhbWVfdXJsIjoiaHR0cHM6Ly9kZW1vZ2FtZXNmcmVlLm1ycXZ5dHJzamQubmV0L2dzMmMvb3BlbkdhbWUuZG8%2FZ2FtZVN5bWJvbD12czIwb2x5bXBnYXRlJmxhbmc9ZW4mbG9iYnlVcmw9aHR0cHM6Ly9zaG9jay5jb20mc3R5bGVuYW1lPXNmd3Nfc2hvY2tzdyZqdXJpc2RpY3Rpb249OTkmdHJlcT1yU3h4Y3FtWm1XUDN6UFdwZTdLODFrSWI2RzBpQlhzeVVRdlhxOVdFU0xLMUFEMTdCUmtGTmg5UTgxUkJTc0VEJmlzR2FtZVVybEFwaUNhbGxlZD10cnVlJnVzZXJJZD1ndWVzdCJ9fQ%3D%3D';//query.data || [];
  
  return (<Div fx fy column  border borderColor="brown-4">
    <Div  className={classNames("GameWrapper", { theatreMode: theatreMode})} column fx justifyContent="center">
      <iframe ref={iframeRef} src={gameLauncher} allowFullScreen height="100%" width="100%" title="Game Launcher" allow="fullscreen; camera; microphone; autoplay" />
    </Div>
    <Div fx bg="black-hover" column={small} borderTop borderColor="brown-4" px={32} py={24} justifyContent="space-between" alignItems="center">
      <Div gap={24} alignItems="center" flexGrow={1} fx >
        <NetworkStatus original={false} />
        <Button data-tooltip-id="app-tooltip" data-tooltip-content={theatreMode ? t('gameModes.standard'):  t('gameModes.theatre')} onClick={handleTheatreMode} className="GameLaunchButton" size="sm" kind="menu-item" icon={SvgFullTheatherMode} />
        <Button data-tooltip-id="app-tooltip" data-tooltip-content={t('gameModes.fullscreen')} onClick={handleFullscreen} className="GameLaunchButton" size="icon" kind="menu-item" icon={SvgFullScreen} /> 
      </Div>
      {!small && demo_available && <Div justifyContent="flex-end" gap={12} fx alignItems="center">
        <Span>{t('demoMode')}</Span>
        <Toggle id="login2fa" kind="secondary" value={demoMode} onChange={handleChangeDemoMode} />
      </Div>}
    </Div>
  </Div>);
};