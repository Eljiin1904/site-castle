import { createHandler } from "./createHandler";

export const ipHandler = createHandler(async (req, res, next) => {
  const cfip = req.headers["cf-connecting-ip"];

  if (cfip && typeof cfip === "string") {
    req.trueIP = cfip;
  } else {
    req.trueIP = req.ip;
  }

  next();
});
