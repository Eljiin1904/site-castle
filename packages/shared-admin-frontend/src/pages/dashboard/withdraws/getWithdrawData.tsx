import { SiteReport } from "@core/types/site/SiteReport";

export function getWithdrawData(data: SiteReport) {
  const txs = data.transactions;

  const cryptoCount = txs.withdrawCryptoCount;
  const cryptoTokens = txs.withdrawCryptoTokens;

  const skinTokens = txs.withdrawSkinTokens;
  const skinCount = txs.withdrawSkinCount;

  const totalTokens = cryptoTokens + skinTokens;
  const totalCount = cryptoCount + skinCount;

  return [
    {
      label: "Crypto",
      className: "subtotal",
      tokens: cryptoTokens,
      count: cryptoCount,
      avgTokens: cryptoTokens / cryptoCount,
    },
    {
      label: "BTC",
      tokens: txs.withdrawCryptoBtcTokens,
      crypto: txs.withdrawCryptoBtcCurrency,
      count: txs.withdrawCryptoBtcCount,
      avgTokens: txs.withdrawCryptoBtcTokens / txs.withdrawCryptoBtcCount,
    },
    {
      label: "ETH",
      tokens: txs.withdrawCryptoEthTokens,
      crypto: txs.withdrawCryptoEthCurrency,
      count: txs.withdrawCryptoEthCount,
      avgTokens: txs.withdrawCryptoEthTokens / txs.withdrawCryptoEthCount,
    },
    {
      label: "LTC",
      tokens: txs.withdrawCryptoLtcTokens,
      crypto: txs.withdrawCryptoLtcCurrency,
      count: txs.withdrawCryptoLtcCount,
      avgTokens: txs.withdrawCryptoLtcTokens / txs.withdrawCryptoLtcCount,
    },
    {
      label: "USDC",
      tokens: txs.withdrawCryptoUsdcTokens,
      crypto: txs.withdrawCryptoUsdcCurrency,
      count: txs.withdrawCryptoUsdcCount,
      avgTokens: txs.withdrawCryptoUsdcTokens / txs.withdrawCryptoUsdcCount,
    },
    {
      label: "USDT-ERC",
      tokens: txs.withdrawCryptoUsdtErcTokens,
      crypto: txs.withdrawCryptoUsdtErcCurrency,
      count: txs.withdrawCryptoUsdtErcCount,
      avgTokens:
        txs.withdrawCryptoUsdtErcTokens / txs.withdrawCryptoUsdtErcCount,
    },
    {
      label: "USDT-TRC",
      tokens: txs.withdrawCryptoUsdtTrcTokens,
      crypto: txs.withdrawCryptoUsdtTrcCurrency,
      count: txs.withdrawCryptoUsdtTrcCount,
      avgTokens:
        txs.withdrawCryptoUsdtTrcTokens / txs.withdrawCryptoUsdtTrcCount,
    },
    {
      label: "Skins",
      className: "subtotal",
      tokens: skinTokens,
      count: skinCount,
      avgTokens: skinTokens / skinCount,
    },
    {
      label: "Skinify",
      tokens: txs.withdrawSkinSkinifyTokens,
      count: txs.withdrawSkinSkinifyCount,
      avgTokens: txs.withdrawSkinSkinifyTokens / txs.withdrawSkinSkinifyCount,
    },
    {
      label: "SkinsBack",
      tokens: txs.withdrawSkinSkinsBackTokens,
      count: txs.withdrawSkinSkinsBackCount,
      avgTokens:
        txs.withdrawSkinSkinsBackTokens / txs.withdrawSkinSkinsBackCount,
    },
    {
      label: "SkinDeck",
      tokens: txs.withdrawSkinSkinDeckTokens,
      count: txs.withdrawSkinSkinDeckCount,
      avgTokens: txs.withdrawSkinSkinDeckTokens / txs.withdrawSkinSkinDeckCount,
    },
    {
      label: "Total",
      className: "total",
      tokens: totalTokens,
      count: totalCount,
      avgTokens: totalTokens / totalCount,
    },
  ];
}
