import { SiteReport } from "@core/types/site/SiteReport";

export function getAccountData(data: SiteReport) {
  const txs = data.transactions;

  return [
    {
      label: "Users",
      className: "regular",
      tokensIn: txs.depositUserTokens,
      tokensOut: txs.withdrawUserTokens,
      profit: txs.depositUserTokens - txs.withdrawUserTokens,
    },
    {
      label: "Sponsored",
      className: "regular",
      tokensIn: txs.depositSponsoredTokens,
      tokensOut: txs.withdrawSponsoredTokens,
      profit: txs.depositSponsoredTokens - txs.withdrawSponsoredTokens,
    },
    {
      label: "Staff",
      className: "regular",
      tokensIn: txs.depositStaffTokens,
      tokensOut: txs.withdrawStaffTokens,
      profit: txs.depositStaffTokens - txs.withdrawStaffTokens,
    },
  ];
}
