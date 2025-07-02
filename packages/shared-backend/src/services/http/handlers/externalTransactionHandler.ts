import { Request, Response, NextFunction } from "express";
import { addSeconds } from "date-fns";
import { Http } from "@server/services/http";
import { HandledError } from "@server/services/errors";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Security } from "@server/services/security";

export const externalTransactionHandler = (
  callback: (req: Request & any, res: Response, next: NextFunction) => void | Promise<void>,
  externalTransactionType: "hub-eight",
) => {
  return Http.createHandler(async (req, res, next) => {
    const token = req.body?.token;

    if (!token) {
      throw new HandledError("Missing token in request body.");
    }

    let userId;
    try {
      const { userDetails } = await Security.getToken({
        kind: `${externalTransactionType}-token`,
        token,
      });
      //  When more external transaction added, configure to adapt to their error types
      // For now Hug Eight, this is the valid error for invalid token
      if (!userDetails) {
        // throw new Error("RS_ERROR_INVALID_TOKEN");
        res.status(200).json({ status: "RS_ERROR_INVALID_TOKEN" });
        return;
      }

      if (!userDetails.id) {
        throw new Error("Not a valid user");
      }
      userId = userDetails.id;
    } catch (err) {
      // throw new HandledError("RS_ERROR_INVALID_TOKEN");
      res.status(200).json({ status: "RS_ERROR_INVALID_TOKEN" });
      return;
    }

    const holdId = Ids.object();

    const result = await Database.collection("user-holds").findOneAndUpdate(
      { userId },
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
      throw new HandledError("Failed to process transaction .");
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
