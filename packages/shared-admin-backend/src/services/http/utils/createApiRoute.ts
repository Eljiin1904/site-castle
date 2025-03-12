import {
  Router,
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from "express";
import { AnyObject, ObjectSchema } from "yup";
import { Http } from "@server/services/http";
import { HandledError } from "@server/services/errors";
import { uploadHandler } from "../handlers/uploadHandler";

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
  secure?: boolean;
  file?: string;
  body?: ObjectSchema<B>;
  query?: ObjectSchema<Q>;
  middleware?: RequestHandler[];
} & (
  | {
      secure: false;
      callback: (
        req: Request<any, any, B, Q, any>,
        res: Response,
        next: NextFunction,
      ) => void | Promise<void>;
    }
  | {
      secure?: true;
      callback: (
        req: Request<any, any, B, Q, any> & Express.AuthenticatedRequest,
        res: Response,
        next: NextFunction,
      ) => void | Promise<void>;
    }
);

export function createApiRoute<B extends AnyObject, Q extends AnyObject>({
  type,
  path,
  secure = true,
  body,
  query,
  file,
  middleware,
  callback,
}: RouteOptions<B, Q>) {
  const handlers: RequestHandler[] = [];

  handlers.push(async (req, res, next) => {
    // TODO: Remove secure flag, all admin is secure
    if (secure && !req.isAuthenticated()) {
      next(new HandledError("Not authenticated."));
    } else {
      next();
    }
  });

  if (file) {
    handlers.push(uploadHandler.single(file));
  }

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

  if (middleware) {
    for (const handler of middleware) {
      handlers.push(handler);
    }
  }

  handlers.push(async (req, res, next) => {
    try {
      await callback(
        req as Request<any, any, B, Q, any> & Express.AuthenticatedRequest,
        res,
        next,
      );
    } catch (e) {
      next(e);
    }
  });

  return (router: Router) => router[type](path, ...handlers);
}
