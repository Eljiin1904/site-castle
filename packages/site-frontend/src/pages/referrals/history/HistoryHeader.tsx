import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Div } from "@client/comps/div/Div";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { UserCampaigns } from "@core/types/users/UserCampaigns";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const HistoryHeader = ({
  limit,
  setLimit,
  campaigns = [],
  campaignId,
  setCampaignId
}: {
  limit: number;
  setLimit: (x: number) => void;
  campaigns: UserCampaigns[];
  campaignId: string | undefined;
  setCampaignId: (x: string) => void;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
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
        <Div center gap={12}>
          <Span flexShrink>{t("campaigns.title")}</Span>
          <Dropdown
            type="select"
            fx={!small}
            size={"sm"}
            options={campaigns.map((x) => x.default ? t('inviteAFriend') : x.campaignName)}
            value={
              campaignId ? campaigns.findIndex((x) => x.campaignId === campaignId) : -1
            }
            onChange={(x, i) =>setCampaignId( campaigns[i].campaignId)}
          />  
        </Div>
        <Div center gap={12}>
          <Span flexShrink>{t("common:perPage")}</Span>
          <Dropdown
            type="select"
            fx={small}
            size="sm"
            options={indexes}
            value={indexes.indexOf(limit)}
            onChange={(x, i) => setLimit(indexes[i])}
          />
        </Div>
      </Div>
    </Div>
  );
};