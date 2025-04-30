import { Database } from "@server/services/database";
import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "campaign-join",
  secure: false,
  callback: async (io, socket, userId) => {
    socket.join("campaign");
    
    const campaigns = await Database.collection("user-campaigns")
      .find(
        { "userId": userId },
        {
          sort: { timestamp: -1 }
        },
      )
      .toArray();

    socket.emit("campaign-init", campaigns);
  },
});
