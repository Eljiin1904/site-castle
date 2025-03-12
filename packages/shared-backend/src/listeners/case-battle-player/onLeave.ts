import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "case-battle-player-leave",
  secure: false,
  callback: async (io, socket, battleId) => {
    socket.leave(`case-battle-player_${battleId}`);
  },
});
