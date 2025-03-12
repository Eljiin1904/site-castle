import { Sockets } from "#app/services/sockets";
import { Database } from "@server/services/database";

export default Sockets.createListener({
  action: "connection",
  callback: async (io, socket) => {
    if (socket.data.isAuthenticated) {
      const notifications = await Database.collection("notifications")
        .find(
          {
            userId: socket.data.userId,
          },
          {
            sort: { timestamp: -1 },
            limit: 25,
          },
        )
        .toArray();

      socket.emit("notifications-init", notifications);
    }
  },
});
