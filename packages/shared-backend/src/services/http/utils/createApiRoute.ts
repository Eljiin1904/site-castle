import { Router, Request, Response, RequestHandler, NextFunction } from "express";
import { AnyObject, ObjectSchema } from "yup";
import { Http } from "@server/services/http";
import { HandledError } from "@server/services/errors";
import { hcaptchaHandler } from "../handlers/hcaptchaHandler";
import { transactionHandler } from "../handlers/transactionHandler";
import { betHandler } from "../handlers/betHandler";
import { uploadHandler } from "../handlers/uploadHandler";
import { regionHandler } from "../handlers/regionHandler";
import { TfaOptions, tfaHandler } from "../handlers/tfaHandler";

type RouteOptions<B extends AnyObject, Q extends AnyObject> = {
  type: "all" | "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
  path: string;
  secure: boolean;
  signatureRequired?: string;
  restricted?: boolean;
  transaction?: boolean;
  captcha?: boolean;
  tfa?: true | TfaOptions;
  bet?: boolean;
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
      secure: true;
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
  restricted,
  secure = true,
  signatureRequired,
  transaction,
  captcha,
  tfa,
  bet,
  body,
  query,
  file,
  middleware,
  callback,
}: RouteOptions<B, Q>) {
  const handlers: RequestHandler[] = [];

  handlers.push(async (req, res, next) => {
    if (secure && !req.isAuthenticated()) {
      next(new HandledError("Not authenticated."));
    } else {
      next();
    }
  });

  if (restricted) {
    handlers.push(regionHandler);
  }

  if (file) {
    handlers.push(uploadHandler.single(file));
  }

  if (captcha) {
    handlers.push(hcaptchaHandler);
  }

  if (tfa) {
    handlers.push(tfaHandler(typeof tfa === "object" ? tfa : {}));
  }

  if (bet) {
    handlers.push(betHandler);
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

  if (transaction) {
    handlers.push(transactionHandler(callback));
  } else {
    handlers.push(
      Http.createHandler(async (req, res, next) => {
        await callback(req as any, res, next);
      }),
    );
  }

  return (router: Router) => router[type](path, ...handlers);
}
