import { SiteReport } from "@core/types/site/SiteReport";

export function getProfitData(data: SiteReport) {
  const txs = data.transactions;

  const cryptoTokens = txs.depositCryptoTokens - txs.withdrawCryptoTokens;

  const depositCryptoOtherTokens =
    txs.depositCryptoTokens -
    txs.depositCryptoBtcTokens -
    txs.depositCryptoLtcTokens -
    txs.depositCryptoEthTokens;

  const withdrawCryptoOtherTokens =
    txs.withdrawCryptoTokens -
    txs.withdrawCryptoBtcTokens -
    txs.withdrawCryptoLtcTokens -
    txs.withdrawCryptoEthTokens;

  const fiatTokens = txs.depositSwappedTokens;

  const gcTokens =
    txs.depositGiftcardG2aTokens +
    txs.depositGiftcardKinguinTokens +
    txs.depositGiftcardPulseTokens;

  const skinTokens = txs.depositSkinTokens - txs.withdrawSkinTokens;

  return [
    {
      label: "Crypto",
      className: "subtotal",
      tokens: cryptoTokens,
    },
    {
      label: "BTC",
      tokens: txs.depositCryptoBtcTokens - txs.withdrawCryptoBtcTokens,
      crypto: txs.depositCryptoBtcCurrency - txs.withdrawCryptoBtcCurrency,
    },
    {
      label: "ETH",
      tokens: txs.depositCryptoEthTokens - txs.withdrawCryptoEthTokens,
      crypto: txs.depositCryptoEthCurrency - txs.withdrawCryptoEthCurrency,
    },
    {
      label: "LTC",
      tokens: txs.depositCryptoLtcTokens - txs.withdrawCryptoLtcTokens,
      crypto: txs.depositCryptoLtcCurrency - txs.withdrawCryptoLtcCurrency,
    },
    {
      label: "Other",
      tokens: depositCryptoOtherTokens - withdrawCryptoOtherTokens,
    },
    {
      label: "Fiat",
      className: "subtotal",
      tokens: fiatTokens,
    },
    {
      label: "Swapped",
      tokens: txs.depositSwappedTokens,
    },
    {
      label: "Gift Cards",
      className: "subtotal",
      tokens: gcTokens,
    },
    {
      label: "G2A",
      tokens: txs.depositGiftcardG2aTokens,
    },
    {
      label: "Kinguin",
      tokens: txs.depositGiftcardKinguinTokens,
    },
    {
      label: "Pulse",
      tokens: txs.depositGiftcardPulseTokens,
    },
    {
      label: "Swapped",
      tokens: txs.depositSwappedTokens,
    },
    {
      label: "Skins",
      className: "subtotal",
      tokens: skinTokens,
    },
    {
      label: "Skinify",
      tokens: txs.depositSkinSkinifyTokens - txs.withdrawSkinSkinifyTokens,
    },
    {
      label: "SkinsBack",
      tokens: txs.depositSkinSkinsBackTokens - txs.withdrawSkinSkinsBackTokens,
    },
    {
      label: "SkinDeck",
      tokens: txs.depositSkinSkinDeckTokens - txs.withdrawSkinSkinDeckTokens,
    },
    {
      label: "Total",
      className: "total",
      tokens: txs.totalDepositAmount - txs.totalWithdrawAmount,
    },
  ];
}
