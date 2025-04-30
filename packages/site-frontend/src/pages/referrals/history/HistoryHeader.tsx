import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Div } from "@client/comps/div/Div";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Span } from "@client/comps/span/Span";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useDispatch } from "react-redux";
import { Affiliates } from "#app/services/affiliates";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const HistoryHeader = () => {
  
  const campaigns = useAppSelector((state) => state.affiliates.campaigns);
  const campaignId = useAppSelector((state) => state.affiliates.selectedCampaignId) ?? '';
  const limit = useAppSelector((state) => state.affiliates.limit);
  const dispatch = useDispatch();
  const small = useIsMobileLayout();
  const { t } = useTranslation(["referrals"]);
  const indexes = [10, 20, 25, 50];
  return (
    <Div
      justify={"space-between"}
      fx
      column={small}
      gap={24}
    >
      <PageTitle width={0}
        heading={t('history.title')}
      />
      <Div gap={small ? 20: 24} flexShrink justifyContent="flex-end">
        {campaigns.length > 0 && <Div center gap={12}>
          <Span flexShrink>{t("campaigns.title")}</Span>
          <Dropdown
            type="select"
            fx={!small}
            size={"sm"}
            options={campaigns.map((x) => x.default ? t('inviteAFriend') : x.campaignName)}
            value={
              campaignId ? campaigns.findIndex((x) => x.campaignId === campaignId) : -1
            }
            onChange={(x, i) => dispatch(Affiliates.setSelectedCampaignId(campaigns[i].campaignId))}
          />  
        </Div>}
        <Div center gap={12}>
          <Span flexShrink>{t("common:perPage")}</Span>
          <Dropdown
            type="select"
            fx={small}
            size="sm"
            options={indexes}
            value={indexes.indexOf(limit)}
            onChange={(x, i) => dispatch(Affiliates.setLimit(indexes[i]))}
          />
        </Div>
      </Div>
    </Div>
  );
};