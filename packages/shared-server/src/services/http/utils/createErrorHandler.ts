import { Request, Response, ErrorRequestHandler, NextFunction } from "express";

export function createErrorHandler(
  callback: (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void | Promise<void>,
) {
  const handler: ErrorRequestHandler = async (err, req, res, next) => {
    try {
      await callback(err, req, res, next);
    } catch (e) {
      next(e);
    }
  };
  return handler;
}
