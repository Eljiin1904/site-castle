import { DoubleRoundDocument } from "@core/types/double/DoubleRoundDocument";
import { Sockets } from "#app/services/sockets";
import { roundStream } from "./helpers/roundStream";
import { ticketStream } from "./helpers/ticketStream";

export default Sockets.createListener({
  action: "event",
  key: "double-join",
  secure: false,
  callback: async (io, socket) => {
    socket.join("double");

    await roundStream.waitForInit();
    await ticketStream.waitForInit();

    const activeRound = roundStream.log[0];

    socket.emit("double-init", {
      round: {
        ...activeRound,
        serverSeed: "",
      },
      history: roundStream.log.slice(1).map((x) => {
        const round = x as DoubleRoundDocument & { status: "completed" };
        return round.roll;
      }),
      tickets: ticketStream.log.filter((x) => x.roundId === activeRound._id),
    });
  },
});
