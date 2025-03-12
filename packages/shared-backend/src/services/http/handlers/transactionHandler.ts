import { Request, Response, NextFunction } from "express";
import { addSeconds } from "date-fns";
import { Http } from "@server/services/http";
import { HandledError } from "@server/services/errors";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";

export const transactionHandler = (
  callback: (
    req: Request & any,
    res: Response,
    next: NextFunction,
  ) => void | Promise<void>,
) => {
  return Http.createHandler(async (req, res, next) => {
    if (!req.isAuthenticated()) {
      throw new HandledError("Route must be secure to be transactional.");
    }

    const userId = req.user._id;
    const holdId = Ids.object();

    const result = await Database.collection("user-holds").findOneAndUpdate(
      {
        userId,
      },
      {
        $setOnInsert: {
          _id: holdId,
          expires: addSeconds(Date.now(), 15),
        },
      },
      {
        returnDocument: "after",
        upsert: true,
      },
    );

    if (!result) {
      throw new HandledError("Failed to process transaction hold.");
    }
    if (result._id !== holdId) {
      throw new HandledError("A previous transaction is still pending.");
    }

    try {
      await callback(req, res, next);
    } finally {
      await Database.collection("user-holds").deleteMany({ userId });
    }
  });
};
