import { HandledError } from "@server/services/errors";
import { Market } from "@server/services/market";
import { Http } from "#app/services/http";

// https://skindeck.com/docs/merchant-api#callbacks

type Body = {
  trade: {
    _id: string;
    type: TradeType;
    status: TradeStatus;
    offerID?: string;
  };
  signature: string;
};

type TradeType = "DEPOSIT" | "WITHDRAW";

type TradeStatus = "INITIATED" | "PENDING" | "ACTIVE" | "COMPLETED" | "FAILED" | "CANCELED";

export default Http.createRoute({
  type: "post",
  path: "/callback",
  callback: async (req, res) => {
    res.json({});

    try {
      const data: Body = req.body;
      const { type, status, offerID } = data.trade;
      const externalId = data.trade._id;

      const manager = Market.getManager("skindeck");

      if (!manager.validateRequest(data)) {
        throw new HandledError("Failed to validate request.");
      }

      if (type === "DEPOSIT") {
        if (status === "COMPLETED") {
          await Market.completeDeposit({
            transactionId: await Market.getTransactionId({ externalId }),
          });
        } else if (status === "FAILED" || status === "CANCELED") {
          await Market.cancelDeposit({
            transactionId: await Market.getTransactionId({ externalId }),
          });
        } else if (offerID) {
          await Market.setDepositSent({
            transactionId: await Market.getTransactionId({ externalId }),
            tradeOfferId: offerID,
          });
        }
      } else if (type === "WITHDRAW") {
        if (status === "COMPLETED") {
          await Market.completeWithdraw({
            transactionId: await Market.getTransactionId({ externalId }),
          });
        } else if (status === "FAILED" || status === "CANCELED") {
          await Market.cancelWithdraw({
            transactionId: await Market.getTransactionId({ externalId }),
            cancelReason: "External IPN failure status.",
          });
        } else if (offerID) {
          await Market.setWithdrawSent({
            transactionId: await Market.getTransactionId({ externalId }),
            tradeOfferId: offerID,
          });
        }
      }
    } catch (e) {
      if (e instanceof HandledError) {
        console.log(`SkinDeck: ${e.message}`);
      }
      throw e;
    }
  },
});
