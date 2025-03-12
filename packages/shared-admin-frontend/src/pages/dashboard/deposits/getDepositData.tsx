import { SiteReport } from "@core/types/site/SiteReport";

export function getDepositData(data: SiteReport) {
  const txs = data.transactions;

  const cryptoCount = txs.depositCryptoCount;
  const cryptoTokens = txs.depositCryptoTokens;

  const fiatTokens = txs.depositSwappedTokens;
  const fiatCount = txs.depositSwappedCount;

  const gcTokens =
    txs.depositGiftcardG2aTokens +
    txs.depositGiftcardKinguinTokens +
    txs.depositGiftcardPulseTokens;

  const gcCount =
    txs.depositGiftcardG2aCount +
    txs.depositGiftcardKinguinCount +
    txs.depositGiftcardPulseCount;

  const skinTokens = txs.depositSkinTokens;
  const skinCount = txs.depositSkinCount;

  const totalTokens = txs.totalDepositAmount;
  const totalCount = txs.totalDepositCount;

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
      tokens: txs.depositCryptoBtcTokens,
      crypto: txs.depositCryptoBtcCurrency,
      count: txs.depositCryptoBtcCount,
      avgTokens: txs.depositCryptoBtcTokens / txs.depositCryptoBtcCount,
    },
    {
      label: "ETH",
      tokens: txs.depositCryptoEthTokens,
      crypto: txs.depositCryptoEthCurrency,
      count: txs.depositCryptoEthCount,
      avgTokens: txs.depositCryptoEthTokens / txs.depositCryptoEthCount,
    },
    {
      label: "LTC",
      tokens: txs.depositCryptoLtcTokens,
      crypto: txs.depositCryptoLtcCurrency,
      count: txs.depositCryptoLtcCount,
      avgTokens: txs.depositCryptoLtcTokens / txs.depositCryptoLtcCount,
    },
    {
      label: "TRX",
      tokens: txs.depositCryptoTrxTokens,
      crypto: txs.depositCryptoTrxCurrency,
      count: txs.depositCryptoTrxCount,
      avgTokens: txs.depositCryptoTrxTokens / txs.depositCryptoTrxCount,
    },
    {
      label: "SOL",
      tokens: txs.depositCryptoSolTokens,
      crypto: txs.depositCryptoSolCurrency,
      count: txs.depositCryptoSolCount,
      avgTokens: txs.depositCryptoSolTokens / txs.depositCryptoSolCount,
    },
    {
      label: "ADA",
      tokens: txs.depositCryptoAdaTokens,
      crypto: txs.depositCryptoAdaCurrency,
      count: txs.depositCryptoAdaCount,
      avgTokens: txs.depositCryptoAdaTokens / txs.depositCryptoAdaCount,
    },
    {
      label: "DOGE",
      tokens: txs.depositCryptoDogeTokens,
      crypto: txs.depositCryptoDogeCurrency,
      count: txs.depositCryptoDogeCount,
      avgTokens: txs.depositCryptoDogeTokens / txs.depositCryptoDogeCount,
    },
    {
      label: "USDC",
      tokens: txs.depositCryptoUsdcTokens,
      crypto: txs.depositCryptoUsdcCurrency,
      count: txs.depositCryptoUsdcCount,
      avgTokens: txs.depositCryptoUsdcTokens / txs.depositCryptoUsdcCount,
    },
    {
      label: "USDT-ERC",
      tokens: txs.depositCryptoUsdtErcTokens,
      crypto: txs.depositCryptoUsdtErcCurrency,
      count: txs.depositCryptoUsdtErcCount,
      avgTokens: txs.depositCryptoUsdtErcTokens / txs.depositCryptoUsdtErcCount,
    },
    {
      label: "USDT-TRC",
      tokens: txs.depositCryptoUsdtTrcTokens,
      crypto: txs.depositCryptoUsdtTrcCurrency,
      count: txs.depositCryptoUsdtTrcCount,
      avgTokens: txs.depositCryptoUsdtTrcTokens / txs.depositCryptoUsdtTrcCount,
    },
    {
      label: "Fiat",
      className: "subtotal",
      tokens: fiatTokens,
      count: fiatCount,
      avgTokens: fiatTokens / fiatCount,
    },
    {
      label: "Swapped",
      tokens: txs.depositSwappedTokens,
      count: txs.depositSwappedCount,
      avgTokens: txs.depositSwappedTokens / txs.depositSwappedCount,
    },
    {
      label: "Gift Cards",
      className: "subtotal",
      tokens: gcTokens,
      count: gcCount,
      avgTokens: gcTokens / gcCount,
    },
    {
      label: "G2A",
      tokens: txs.depositGiftcardG2aTokens,
      count: txs.depositGiftcardG2aCount,
      avgTokens: txs.depositGiftcardG2aTokens / txs.depositGiftcardG2aCount,
    },
    {
      label: "Kinguin",
      tokens: txs.depositGiftcardKinguinTokens,
      count: txs.depositGiftcardKinguinCount,
      avgTokens:
        txs.depositGiftcardKinguinTokens / txs.depositGiftcardKinguinCount,
    },
    {
      label: "Pulse",
      tokens: txs.depositGiftcardPulseTokens,
      count: txs.depositGiftcardPulseCount,
      avgTokens: txs.depositGiftcardPulseTokens / txs.depositGiftcardPulseCount,
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
      tokens: txs.depositSkinSkinifyTokens,
      count: txs.depositSkinSkinifyCount,
      avgTokens: txs.depositSkinSkinifyTokens / txs.depositSkinSkinifyCount,
    },
    {
      label: "SkinsBack",
      tokens: txs.depositSkinSkinsBackTokens,
      count: txs.depositSkinSkinsBackCount,
      avgTokens: txs.depositSkinSkinsBackTokens / txs.depositSkinSkinsBackCount,
    },
    {
      label: "SkinDeck",
      tokens: txs.depositSkinSkinDeckTokens,
      count: txs.depositSkinSkinDeckCount,
      avgTokens: txs.depositSkinSkinDeckTokens / txs.depositSkinSkinDeckCount,
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
