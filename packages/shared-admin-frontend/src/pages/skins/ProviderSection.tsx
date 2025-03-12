import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MarketProviderInfo } from "@core/types/market/MarketProviderInfo";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Button } from "@client/comps/button/Button";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { usePost } from "@client/hooks/system/usePost";
import { Toasts } from "@client/services/toasts";
import { Site } from "#app/services/site";
import { Market } from "#app/services/market";
import { ProviderTable } from "./ProviderTable";

export const ProviderSection = () => {
  const [processing, setProcessing] = useState(false);

  const query = useQuery({
    queryKey: ["skin-providers"],
    queryFn: () => Market.getProviders(),
    placeholderData: (prev) => prev,
  });

  const providers = query.data?.providers || [];

  const handleToggle = usePost(async (_, info: MarketProviderInfo) => {
    await Site.editSetting({
      settingId: `${info.provider}Enabled`,
      settingValue: !info.enabled,
    });
    query.refetch();
    Toasts.success("Setting updated.");
  }, setProcessing);

  return (
    <Div
      fx
      column
      gap={16}
    >
      <Div
        fx
        align="center"
      >
        <Div grow>
          <Heading>{"Providers"}</Heading>
        </Div>
        <Div>
          <Button
            kind="secondary"
            icon={SvgRedo}
            onClick={query.refetch}
          />
        </Div>
      </Div>
      <ProviderTable
        providers={providers}
        isLoading={query.isFetching}
        isProcessing={processing}
        onToggle={handleToggle}
      />
    </Div>
  );
};
