import {
  Router,
  Request,
  Response,
  RequestHandler,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import passport from "passport";
import { HandledError } from "@server/services/errors";

type RouteOptions = {
  type:
    | "all"
    | "get"
    | "post"
    | "put"
    | "delete"
    | "patch"
    | "options"
    | "head";
  path: string;
  strategy: string;
  onFail?: (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void | Promise<void>;
  onSuccess?: (
    req: Request & Express.AuthenticatedRequest,
    res: Response,
  ) => void | Promise<void>;
};

export function createAuthRoute({
  type,
  path,
  strategy,
  onFail,
  onSuccess,
}: RouteOptions) {
  const handlers: (RequestHandler | ErrorRequestHandler)[] = [];

  handlers.push(
    passport.authenticate(strategy, { failWithError: true }) as RequestHandler,
  );

  if (onFail) {
    const failHandler: ErrorRequestHandler = async (err, req, res, next) => {
      try {
        await onFail(err, req, res, next);
      } catch (e) {
        next(e);
      }
    };
    handlers.push(failHandler);
  }

  if (onSuccess) {
    const successHandler: RequestHandler = async (req, res, next) => {
      try {
        if (!req.isAuthenticated()) {
          throw new HandledError("Authentication failed.");
        }
        await onSuccess(req, res);
      } catch (e) {
        next(e);
      }
    };
    handlers.push(successHandler);
  }

  return (router: Router) => router[type](path, ...handlers);
}
