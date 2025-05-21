import { Database } from "@server/services/database";
import { Sockets } from "#app/services/sockets";
import { feedManager } from "./helpers/feedManager";
import { Users } from "#app/services/users";
import { maskHiddenUser } from "@server/services/blackjack/Blackjack";

export default Sockets.createListener({
  action: "event",
  key: "blackjack-join",
  secure: false,
  callback: async (io, socket) => {
    const { isAuthenticated, userId } = socket.data;
    let isAdmin: boolean | undefined = false;
    if (isAuthenticated && userId) {
      const user = await Database.collection("users").findOne(
        { _id: userId },
        { projection: { role: 1 } },
      );
      if (!user) throw new Error("User not found by id " + userId);
      const { viewHiddenUsers } = Users.getPermissions(user.role);
      isAdmin = viewHiddenUsers;
    }

    const room = isAdmin ? "blackjack-admin" : "blackjack";
    socket.join(room);

    await feedManager.waitForInit();
    const feed = feedManager.log.slice();

    const modFeed = feed.map((item) => ({
      ...item,
      user: maskHiddenUser(item.user, { mask: !isAdmin }),
      userId: null, // redundant anyway
    }));

    socket.emit("blackjack-init", {
      // result: game.getApiResponse(),
      feed: modFeed,
    });
  },
});
