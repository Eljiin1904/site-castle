import { SitePage } from "#app/comps/site-page/SitePage";
import { ProviderSection } from "./ProviderSection";
import { TransactionsSection } from "./TransactionsSection";

export const SkinsPage = () => {
  return (
    <SitePage
      className="SkinsPage"
      title="Skins"
    >
      <ProviderSection />
      <TransactionsSection />
    </SitePage>
  );
};
