import { HandledError } from "@server/services/errors";
import { Market } from "@server/services/market";
import { Http } from "#app/services/http";

// https://skinsback.com/docs/api/v1/callback

type Body = {
  status: "success" | "fail";
  transaction_id: string;
  order_id: string;
  steam_id: string;
  date: number;
  sign: string;
} & (
  | {
      status: "success";
      amount: number;
    }
  | {
      status: "fail";
    }
);

export default Http.createRoute({
  type: "post",
  path: "/deposit",
  callback: async (req, res) => {
    res.json({});

    try {
      const data: Body = req.body;

      const manager = Market.getManager("skinsback");

      if (!manager.validateRequest(data)) {
        throw new HandledError("Failed to validate request.");
      }

      if (data.status === "success") {
        await Market.completeDeposit({
          transactionId: data.order_id,
        });
      } else if (data.status === "fail") {
        await Market.cancelDeposit({
          transactionId: data.order_id,
        });
      }
    } catch (e) {
      if (e instanceof HandledError) {
        console.log(`Skinsback: ${e.message}`);
      }
      throw e;
    }
  },
});
