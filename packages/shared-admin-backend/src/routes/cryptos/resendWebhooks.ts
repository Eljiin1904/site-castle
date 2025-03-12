import { Cryptos } from "@server/services/cryptos";
import { Http } from "#app/services/http";
import { Validation } from "@core/services/validation";

export default Http.createApiRoute({
  type: "post",
  path: "/resend-webhooks",
  body: Validation.object({
    txId: Validation.string().required("TxID is required."),
  }),
  callback: async (req, res) => {
    const { txId } = req.body;

    await Cryptos.fireblocks().resendTransactionWebhooksById(txId, true, true);

    res.json({});
  },
});
