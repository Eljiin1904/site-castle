import { Request, Response, NextFunction } from "express";

export function createHandler<R = Request>(
  callback: (req: R, res: Response, next: NextFunction) => void | Promise<void>,
) {
  return async (req: R, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}
