import { createHandler } from "../utils/createHandler";
import { handleError } from "../utils/handleError";

export const errorHandler = createHandler(async (socket, next) => {
  socket.on("error", (err) => {
    handleError(err);
  });

  next();
});
