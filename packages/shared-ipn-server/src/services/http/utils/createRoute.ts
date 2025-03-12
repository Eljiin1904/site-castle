import {
  Router,
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from "express";
import { Http } from "@server/services/http";

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
  callback: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void | Promise<void>;
};

export function createRoute({ type, path, callback }: RouteOptions) {
  const handlers: RequestHandler[] = [];

  handlers.push(
    Http.createHandler(async (req, res, next) => {
      await callback(req, res, next);
    }),
  );

  return (router: Router) => router[type](path, ...handlers);
}
