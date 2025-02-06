import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAddBot } from "./useAddBot";
import { useJoin } from "./useJoin";
import { BattlePlayerCard } from "./BattlePlayerCard";
import { BattlePlayerSeat } from "./BattlePlayerSeat";
import "./BattlePlayers.scss";

export const BattlePlayers = () => {
  const userId = useAppSelector((x) => x.user._id);
  const players = useAppSelector((x) => x.battlePlayer.players);
  const processing = useAppSelector((x) => x.battlePlayer.processing);

  const handleAddBot = useAddBot();
  const handleJoin = useJoin();

  return (
    <Div
      className={classNames("BattlePlayers", {
        [`players-${players.length}`]: players.length,
      })}
    >
      {players.map((player, seat) =>
        player ? (
          <BattlePlayerCard
            key={seat}
            player={player}
          />
        ) : (
          <BattlePlayerSeat
            key={seat}
            bot={players[0]?.id === userId}
            processing={processing}
            onBotClick={() => handleAddBot(seat)}
            onJoinClick={() => handleJoin(seat)}
          />
        ),
      )}
    </Div>
  );
};
