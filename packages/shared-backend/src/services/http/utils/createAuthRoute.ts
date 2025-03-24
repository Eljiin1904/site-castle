import {
  Router,
  Request,
  Response,
  RequestHandler,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import passport from "passport";
import { addMinutes } from "date-fns";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserLinkProvider } from "@core/types/users/UserLinkProvider";
import { HandledError } from "@server/services/errors";
import { Ids } from "@server/services/ids";
import { Security } from "@server/services/security";
import { hcaptchaHandler } from "../handlers/hcaptchaHandler";
import { regionHandler } from "../handlers/regionHandler";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

type RouteOptions = {
  type: "all" | "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
  path: string;
  strategy: "local" | UserLinkProvider;
  captcha?: boolean;
  finalizes?: boolean;
  onFail?: (err: unknown, req: Request, res: Response, next: NextFunction) => void | Promise<void>;
  onSuccess?: (req: Request & Express.AuthenticatedRequest, res: Response) => void | Promise<void>;
};

export function createAuthRoute({
  type,
  path,
  strategy,
  captcha,
  finalizes,
  onFail,
  onSuccess,
}: RouteOptions) {
  const logger = getServerLogger({});
  logger.debug("starting auth handling");
  const handlers: (RequestHandler | ErrorRequestHandler)[] = [];

  handlers.push(regionHandler);

  if (captcha) {
    handlers.push(hcaptchaHandler);
  }

  if (finalizes) {
    const callbackHandler: RequestHandler = async (req, res, next) => {
      passport.authenticate(strategy, (err: any, user: UserDocument | null) => {
        if (err) {
          next(err);
        } else if (!user) {
          next(new HandledError("User deserialization failed."));
        } else if (user.tfa.enabled && user.settings.login2fa) {
          Security.createToken({
            kind: "otp-login",
            token: Ids.long(),
            expires: addMinutes(Date.now(), 5),
            userId: user._id,
            strategy,
          })
            .then((loginToken) => {
              res.json({ action: "2fa", userId: user._id, loginToken });
            })
            .catch(next);
        } else {
          req.login(user, next);
        }
      })(req, res, next);
    };
    handlers.push(callbackHandler);
  } else {
    handlers.push(passport.authenticate(strategy, { failWithError: true }));
  }

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
