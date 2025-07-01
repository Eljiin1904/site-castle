import React from "react";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useQuery } from "@tanstack/react-query";
import { HubEight } from "#app/services/hubEight";

export const GameProvider = ({
  selectedProviders,
  setSelectedProviders
}: {
  selectedProviders?: string[];
  setSelectedProviders?: (providers: string[]) => void;
}) => {
  
  const small = useIsMobileLayout();
  const {t} = useTranslation(['games']);

  const query = useQuery({
    queryKey: ["game-providers"],
    queryFn: () => HubEight.getProductList(),
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
      options={providers.map((p) => {return {label: p.product, description: p.count}})}
      value={selectedProviders}
      onChange={(product) => {
        setSelectedProviders(prev => prev.includes(product) ? prev.filter(p => p !== product) : [...prev, product]);      
      }}
    />);
};
