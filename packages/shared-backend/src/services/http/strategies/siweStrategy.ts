import { Strategy as PassportStrategy } from "passport-strategy";
import { Request } from "express";
import { ethers } from "ethers";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { UnknownUserError } from "../errors/UnknownUserError";
import { ExistingUserError } from "../errors/ExistingUserError";

interface CustomStrategyOptions {
  passReqToCallback?: boolean;
}

type VerifyFunction = (
  req: Request,
  address: string,
  done: (error: any, user?: any) => void,
) => void;

export function siweStrategy() {
  const logger = getServerLogger({});
  logger.info("executing siwe auth strategy");

  const strategy = new SIWEStrategyClass({}, verify);

  strategy.name = "siwe";

  return strategy;
}

// SIWE = Sign-in with Ethereum
export class SIWEStrategyClass extends PassportStrategy {
  name = "siwe";
  verify: VerifyFunction;

  constructor(options: CustomStrategyOptions, verify: VerifyFunction) {
    super();
    this.verify = verify;
  }

  authenticate(req: Request) {
    const logger = getServerLogger({});
    logger.info("authenticating via SIWE");
    const { address, signature, nonce }: { address?: string; signature?: string; nonce?: string } =
      req.query;

    if (!address || !signature || !nonce) {
      logger.error("missing authenticiation fields for user " + req.body);
      return this.fail("Missing authentication fields", 400);
    }

    try {
      // Verify the signature
      const recoveredAddress = ethers.verifyMessage(nonce, signature);

      if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
        return this.fail("Invalid signature", 401);
      }

      // Call the provided verification function (e.g., find user in database)
      this.verify(req, address, (error, user) => {
        if (error) return this.error(error);
        if (!user) return this.fail("User not found", 401);
        this.success(user);
      });
    } catch (error) {
      return this.error(error as Error);
    }
  }
}

async function verify(req: Request, walletAddress: string, done: (error: any, user?: any) => void) {
  const logger = getServerLogger({});
  try {
    logger.debug("verifying SIWE user is in database for address: " + walletAddress);
    if (req.isAuthenticated()) {
      logger.debug("user authenticated");
      if (await Database.exists("users", { walletAddress })) {
        logger.warn("user authenticated and wallet address is already linked: " + walletAddress);
        throw new HandledError("validation:errors.metamask.walletinked");
      }

      await Database.collection("users").updateOne(
        { _id: req.user._id },
        { $set: { walletAddress } },
      );
      logger.info("user updated: " + walletAddress);

      throw new ExistingUserError();
    } else {
      logger.debug("user not authenticated");
      const user = await Database.collection("users").findOne({ walletAddress });

      if (user) {
        done(null, user);
      } else {
        if (await Database.exists("users", { walletAddress })) {
          throw new HandledError("Wallet address is already linked.");
        }

        logger.info("unknown user: " + walletAddress);
        throw new UnknownUserError(walletAddress);
      }
    }
  } catch (err) {
    done(err);
  }
}
