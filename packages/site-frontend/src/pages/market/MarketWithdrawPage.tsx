import { SitePage } from "#app/comps/site-page/SitePage";
import { WithdrawContent } from "./withdraw/WithdrawContent";

export function MarketWithdrawPage() {
  return (
    <SitePage
      className="MarketWithdrawPage"
      title="Withdraw Skins"
    >
      <WithdrawContent />
    </SitePage>
  );
}
