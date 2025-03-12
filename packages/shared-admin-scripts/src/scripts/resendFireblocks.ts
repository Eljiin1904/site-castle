import { Cryptos } from "@server/services/cryptos";

export async function resendFireblocks() {
  await Cryptos.fireblocks().resendTransactionWebhooksById(
    "FB_TX_ID",
    true,
    true,
  );
}
