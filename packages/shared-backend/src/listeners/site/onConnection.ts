import { Site } from "#app/services/site";
import { Sockets } from "#app/services/sockets";
import { UserLatencyRecording } from "@core/types/users/UserLatencyDocument";
import { Users } from "@server/services/users";

export default Sockets.createListener({
  action: "connection",
  callback: async (io, socket) => {
    socket.emit("site-time", Date.now());

    const settings = await Site.settings.cache();

    socket.emit("site-settings-init", settings);

    const meta = await Site.meta.cache();

    socket.emit("site-meta-init", meta);

    const userId = socket.data.userId;

    setInterval(() => {
      const start = Date.now();      
      socket.emit("pong", () => {
        
        const now = Date.now();
        const latency:UserLatencyRecording = {
          latency: (now - start) / 2,
          timestamp: new Date(),
        }
        Users.recordLatency(userId, latency, socket.id);
      });
    }, 5000);
  },
});
