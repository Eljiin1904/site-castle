import { useEffect, useState } from "react";
import { GamePage } from "#app/comps/game-page/GamePage";
import { getGameList } from "../../services/hubEight/api/getHubGameList";
import { ExternalGamesList } from "./ExternalGamesList";

export const ExternalGamesPage = () => {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    getGameList()
      .then((res) => {
        setGameList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <GamePage title="External Games">
      <ExternalGamesList games={gameList} />
    </GamePage>
  );
};
