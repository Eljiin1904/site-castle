import { SitePage } from "#app/comps/site-page/SitePage";
import { GasStationSection } from "./GasStationSection";
import { HotWalletSection } from "./HotWalletSection";
import { TransactionsSection } from "./TransactionsSection";

export const CryptoPage = () => {
  return (
    <SitePage
      className="CryptoPage"
      title="Crypto"
    >
      <GasStationSection />
      <HotWalletSection />
      <TransactionsSection />
    </SitePage>
  );
};
