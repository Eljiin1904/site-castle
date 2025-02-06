import { SitePage } from "#app/comps/site-page/SitePage";
import { DepositContent } from "./deposit/DepositContent";

export function MarketDepositPage() {
  return (
    <SitePage
      className="MarketDepositPage"
      title="Deposit Skins"
      privileged
    >
      <DepositContent />
    </SitePage>
  );
}
