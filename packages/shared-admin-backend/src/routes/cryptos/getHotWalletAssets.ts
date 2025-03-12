import { CryptoAsset } from "@core/types/cryptos/CryptoAsset";
import { Cryptos } from "@server/services/cryptos";
import { Http } from "#app/services/http";
import config from "#app/config";

export default Http.createApiRoute({
  type: "post",
  path: "/get-hot-wallet-assets",
  callback: async (req, res) => {
    const vault = await Cryptos.fireblocks().getVaultAccountById(config.fireblocksWithdrawId);
    const assets: CryptoAsset[] = [];

    for (const asset of vault.assets || []) {
      const crypto = Cryptos.infos.find((x) => x.assetId === asset.id && x.canWithdraw);

      if (!crypto) {
        continue;
      }

      const usdRate = await Cryptos.getRate(crypto.symbol);
      const cryptoAmount = Number.parseFloat(asset.available || "0");

      assets.push({
        cryptoKind: crypto.kind,
        cryptoAmount,
        usdAmount: cryptoAmount * usdRate,
      });
    }

    res.json({ assets });
  },
});
