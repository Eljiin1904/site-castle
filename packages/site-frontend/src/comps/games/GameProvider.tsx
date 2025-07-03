import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useQuery } from "@tanstack/react-query";
import { HubEight } from "#app/services/hubEight";
import { ExternalGameCategory } from "@core/types/hub-eight/GameInformation";

export const GameProvider = ({
  selectedProviders,
  setSelectedProviders,
  category
}: {
  selectedProviders: string[];
  setSelectedProviders: React.Dispatch<React.SetStateAction<string[]>>
  category?: ExternalGameCategory;
}) => {
  
  const small = useIsMobileLayout();
  const {t} = useTranslation(['games']);

  const query = useQuery({
    queryKey: ["game-providers",category],
    queryFn: () => HubEight.getProductList({category}),
    placeholderData: (prev) => prev,
  });

  const providers = query.data?.products || [];
  if(!providers.length) 
  return null;
  
  return (<Dropdown
      type="multiselect"
      fx={small}
      size="lg"
      tag={t('provider.title')}
      options={providers.map((p) => {return {label: p.product, description: p.count.toString()}})}
      value={selectedProviders}
      onChange={(product) =>  setSelectedProviders(prev => {
        if (prev.includes(product)) {
          return prev.filter((p) => p !== product);
        } else {
          return [...prev, product];
        }
      })}
    />);
};
