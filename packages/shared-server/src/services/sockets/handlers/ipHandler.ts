import { createHandler } from "../utils/createHandler";

export const ipHandler = createHandler(async (socket, next) => {
  const cfip = socket.request.headers["cf-connecting-ip"];

  if (cfip && typeof cfip === "string") {
    socket.data.ip = cfip;
  } else {
    socket.data.ip = socket.conn.remoteAddress;
  }

  next();
});
