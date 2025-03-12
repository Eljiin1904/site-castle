import {
  Router,
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from "express";
import { AnyObject, ObjectSchema } from "yup";
import { Http } from "@server/services/http";
import { authorizeHandler } from "../handlers/authorizeHandler";

type RouteOptions<B extends AnyObject, Q extends AnyObject> = {
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
  body?: ObjectSchema<B>;
  query?: ObjectSchema<Q>;
  callback: (
    req: Request<any, any, B, Q, any>,
    res: Response,
    next: NextFunction,
  ) => void | Promise<void>;
};

export function createRoute<B extends AnyObject, Q extends AnyObject>({
  type,
  path,
  body,
  query,
  callback,
}: RouteOptions<B, Q>) {
  const handlers: RequestHandler[] = [];

  handlers.push(authorizeHandler);

  handlers.push(
    Http.createHandler(async (req, res, next) => {
      if (query) {
        req.query = await query.validate(req.query);
      }
      if (body) {
        req.body = await body.validate(req.body);
      }
      next();
    }),
  );

  handlers.push(
    Http.createHandler(async (req, res, next) => {
      await callback(req as Request<any, any, B, Q, any>, res, next);
    }),
  );

  return (router: Router) => router[type](path, ...handlers);
}
