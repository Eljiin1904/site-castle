import { HandledError } from "@server/services/errors";
import { Market } from "@server/services/market";
import { Http } from "#app/services/http";

// https://skinify.io/api-docs/ipn

type Body = {
  status: "success" | "failed";
  transaction_id: string;
  deposit_id: string;
  steam_id: string;
  date: number;
  token_md5: string;
} & (
  | {
      status: "success";
      amount: number;
    }
  | {
      status: "failed";
    }
);

export default Http.createRoute({
  type: "post",
  path: "/deposit",
  callback: async (req, res) => {
    res.json({});

    try {
      const data: Body = req.body;

      const manager = Market.getManager("skinify");

      if (!manager.validateRequest(data)) {
        throw new HandledError("Failed to validate request.");
      }

      if (data.status === "success") {
        await Market.completeDeposit({
          transactionId: data.deposit_id,
        });
      } else if (data.status === "failed") {
        await Market.cancelDeposit({
          transactionId: data.deposit_id,
        });
      }
    } catch (e) {
      if (e instanceof HandledError) {
        console.log(`Skinify: ${e.message}`);
      }
      throw e;
    }
  },
});
